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

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();
  
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    // Aquí puedes agregar la lógica para manejar el registro
    console.log('Registrarse con:', username, password, email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Registrarse</Text>

        <TextInput
          placeholder="Nombre de usuario..."
          style={styles.input}
          placeholderTextColor={Colors.background}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholder="Correo..."
          value={email}
          style={styles.input}
          placeholderTextColor={Colors.background}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Contraseña..."
          value={password}
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
          <Text style={{color: 'white'}}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 10,
            alignItems: 'center',
          }}
          onPress={goToLogin}>
          <Text style={{color: Colors.button}}>Iniciar sesion</Text>
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

export default Register;
