import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import {Colors} from '../assets/Colors';
import Setting from '../components/Settings/Setting';
import ChangeSettings from '../components/Settings/ChangeSetting';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [userData, setUserData] = useState({
    username: 'Juan Duarte',
    user_weight: '62Kg',
    user_height: '175cm',
    user_age: '19',
  });

  const handleModalClose = type => {
    setModalVisible(true);
    setModalType(type);
  };

  const navigation = useNavigation();

  const goLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userIdParsed = userId ? JSON.parse(userId) : null;

        const data = await fetch(
          `http://34.226.157.153:8000/userData/${userIdParsed}`,
        );
        const json = await data.json();

        console.log('Datos del usuario:', json);

        // Actualizar el estado con los datos obtenidos
        setUserData({
          username: json.nombre || 'Juan Duarte',
          user_weight: json.peso || '62Kg',
          user_height: json.altura || '175',
          user_age: json.edad || '19',
        });
      } catch (error) {
        console.error('Error al obtener datos de AsyncStorage:', error);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Configuración" />

      <Text style={styles.subTitle}>Datos de usuario</Text>
      <Setting
        title="Nombre"
        actual={userData.username}
        setChangeType={handleModalClose}
      />
      <Setting
        title="Peso"
        actual={userData.user_weight}
        setChangeType={handleModalClose}
      />
      <Setting
        title="Altura"
        actual={`${userData.user_height}cm`}
        setChangeType={handleModalClose}
      />
      <Setting
        title="Edad"
        actual={userData.user_age}
        setChangeType={handleModalClose}
      />
      <TouchableOpacity style={styles.button} onPress={goLogin}>
        <Text style={styles.text}>Cerrar sesion</Text>
        <FontAwesome6
          name="power-off"
          size={24}
          iconStyle="solid"
          color={Colors.button}
          style={{marginBottom: -3}}
        />
      </TouchableOpacity>

      <Text style={styles.subTitle}>Entrenamiento</Text>
      <Setting title="Deporte " actual="Running" />
      <Setting title="Enfermedad cardiov.." actual="N/A" />

      <ChangeSettings
        visible={modalVisible}
        message={`Cambiar ${modalType}`}
        type={modalType}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: Colors.textPrimary,
    width: '90%',
    textAlign: 'left',
    marginVertical: 10,
  },
  button: {
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 20,
  },
  text: {
    color: Colors.button,
    fontSize: 16,
  },
});

export default Settings;
