import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {Colors} from '../Assets/Colors';
import Header from '../components/Header';
import {Snackbar} from 'react-native-paper';

const ConnectDevice = () => {
  const [manager] = useState(new BleManager());
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [mensaje, setMensaje] = useState('Conectando...');

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return (
        granted['android.permission.BLUETOOTH_SCAN'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.BLUETOOTH_CONNECT'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } else if (Platform.OS === 'ios') {
      // En iOS no se necesitan permisos explícitos para BLE, pero debes incluir la descripción en Info.plist
      return true;
    }
    return false;
  };

  // Modifica el useEffect para incluir la verificación de permisos
  useEffect(() => {
    const init = async () => {
      const hasPermissions = await requestPermissions();
      if (hasPermissions) {
        const subscription = manager.onStateChange(state => {
          if (state === 'PoweredOn') {
            scanAndConnect();
            subscription.remove();
          }
        }, true);
      }
    };
    init();

    return () => {
      manager.destroy();
    };
  }, [manager]);

  // Función para escanear dispositivos BLE
  const scanAndConnect = () => {
    console.log('Iniciando escaneo...');
    setDevices([]); // Reinicia la lista de dispositivos
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Error en el escaneo:', error);
        setMensaje('Error en el escaneo, prueba encendiendo el bluetooth');
        setIsConnecting(true);
        return;
      }
      // Filtra por dispositivos cuyo nombre contenga "ESP32"
      setDevices(prevDevices => {
        if (!prevDevices.some(d => d.id === device.id)) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    });
    // Detén el escaneo después de 10 segundos
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 10000);
  };

  // Función para conectar a un dispositivo
  const connectToDevice = async device => {
    if (isConnecting) return; // Evita múltiples conexiones simultáneas
    setIsConnecting(true);
    try {
      const connected = await device.connect();
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      setIsConnecting(false);
      console.log('Conectado a:', connected.name);
    } catch (error) {
      console.error('Error al conectar:', error);
      setIsConnecting(true);
      setMensaje('Error al conectar al dispositivo', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Conectar Dispositivo" />
      <Text style={styles.title}>Dispositivos Encontrados</Text>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.device}
            onPress={() => connectToDevice(item)}>
            <Text
              numberOfLines={1}
              style={{fontSize: 16, color: Colors.textSecondary}}>
              {item.name || 'Dispositivo sin nombre'}
            </Text>
          </TouchableOpacity>
        )}
      />
      {connectedDevice && (
        <View style={styles.connected}>
          <Text>Conectado a: {connectedDevice.name}</Text>
        </View>
      )}
      <TouchableOpacity
        title="Reescanear"
        onPress={scanAndConnect}
        style={styles.Button}>
        <Text
          style={{color: Colors.textPrimary, fontSize: 16, fontWeight: 'bold'}}>
          Reescanear
        </Text>
      </TouchableOpacity>

      <Snackbar
        visible={isConnecting}
        onDismiss={() => setIsConnecting(null)}
        action={{
          label: 'Cerrar',
          onPress: () => {
            // Hacer algo al cerrar el Snackbar
          },
        }}>
        {mensaje}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  device: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: Colors.dark,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  connected: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: Colors.success,
    borderRadius: 8,
  },
  Button: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: Colors.button,
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default ConnectDevice;
