import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Colors} from '../assets/Colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    try {
      if (username.trim() === '' || password.trim() === '') {
        throw new Error('Por favor, completa todos los campos.');
      }
      const data = await fetch('http://34.226.157.153:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });

      if (!data.ok) {
        throw new Error(
          'Error al iniciar sesión. Por favor, verifica tus credenciales.',
        );
      }

      const response = await data.json();
      console.log('Inicio de sesión exitoso:', response);

      // guardar el id en el async storage o en el estado global
      await AsyncStorage.setItem('userId', response.user_id.toString());

      // redireccionar a la pantalla principal
      navigation.navigate('MainTabs', {screen: 'Menu'});
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }

    console.log('Iniciar sesión con:', username, password);
  };


  const handleRegister = () => {
    // Aquí puedes agregar la lógica para manejar el registro

    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Iniciar sesion</Text>

        <TextInput
          placeholder="Nombre de usuario..."
          style={styles.input}
          placeholderTextColor={Colors.background}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Contraseña..."
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor={Colors.background}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle login
            handleLogin();
          }}>
          <Text style={{color: 'white'}}>Iniciar sesion</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 10,
            alignItems: 'center',
          }}
          onPress={() => {
            handleRegister();
          }}>
          <Text style={{color: Colors.button}}>Crear nueva cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loginContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    padding: 12,
    borderRadius: 16,
    backgroundColor: Colors.light,
    color: Colors.background,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: Colors.button,
    padding: 12,
    borderRadius: 16,
    marginVertical: 10,
  },
});

export default Login;
