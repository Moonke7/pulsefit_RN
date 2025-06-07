import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Platform, PermissionsAndroid } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
import Header from "../components/Header";
import WorkingZone from "../components/Home/WorkingZone";
import HRGraphic from "../components/Home/HRGraphic";
import { Colors } from "../assets/Colors";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const CHARACTERISTIC_UUID = "abcd1234-5678-90ab-cdef-1234567890ab";
const DEVICE_NAME = "ESP32-Pulsometro-BLE";

const Home = () => {
  const [heartRate, setHeartRate] = useState(0);
  const [connected, setConnected] = useState(false);
  const manager = useState(new BleManager())[0];
  let charSubscription;

  // Pedir permisos BLE en Android
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return Object.values(grants).every(g => g === PermissionsAndroid.RESULTS.GRANTED);
    }
    return true;
  };

  useEffect(() => {
    let isCancelled = false;

    const startBLE = async () => {
      const ok = await requestPermissions();
      if (!ok) {
        console.warn("Permisos BLE no concedidos");
        return;
      }

      const stateSubscription = manager.onStateChange(state => {
        if (state === "PoweredOn" && !isCancelled) {
          manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
              console.error("Error escaneando:", error);
              return;
            }
            if (device.name === DEVICE_NAME) {
              manager.stopDeviceScan();
              device
                .connect()
                .then(d => {
                  setConnected(true);
                  return d.discoverAllServicesAndCharacteristics();
                })
                .then(d => {
                  charSubscription = d.monitorCharacteristicForService(
                    SERVICE_UUID,
                    CHARACTERISTIC_UUID,
                    (err, characteristic) => {
                      if (err) {
                        console.error("Error notificación:", err);
                        return;
                      }
                      if (characteristic?.value) {
                        const decoded = Buffer.from(characteristic.value, "base64").toString("utf-8");
                        const match = decoded.match(/BPM=(\d+\.?\d*)/);
                        if (match) {
                          setHeartRate(Math.round(parseFloat(match[1])));
                        }
                      }
                    }
                  );
                })
                .catch(console.error);
            }
          });
          // ya no necesitamos stateSubscription
          stateSubscription.remove();
        }
      }, true);
    };

    startBLE();

    return () => {
      isCancelled = true;
      manager.stopDeviceScan();
      if (charSubscription) {
        charSubscription.remove();
      }
      manager.destroy();
    }; 
  }, [manager]);

  console.log("Conectado:", heartRate);

  return (
    <View style={styles.container}>
      <Header title="Inicio" />
      <WorkingZone heartRate={heartRate}/>
      <HRGraphic heartRate={heartRate}/>

      <TouchableOpacity style={styles.button}>
        <Text style={{ color: Colors.textPrimary, fontSize: 16 }}>
          Empezar entrenamiento
        </Text>
        <FontAwesome6
          name="dumbbell"
          size={24}
          iconStyle="solid"
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  bpmText: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: Colors.button,
    padding: 12,
    borderRadius: 16,
    width: "90%",
    marginVertical: 20,
  },
});

export default Home;
