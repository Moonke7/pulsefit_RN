import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Home from './views/Home';
import {Colors} from './assets/Colors';
import Training from './views/Training';
import UpdateTrain from './views/UpdateTrain';
import Settings from './views/Settings';
import ConnectDevice from './views/ConnectDevice';
import Login from './views/Login';
import Register from './views/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Menu" // Define la pantalla inicial
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Menu') {
            iconName = 'house'; // Ícono para la vista principal
          } else if (route.name === 'Train') {
            iconName = 'dumbbell'; // Ícono para la vista de PDF
          } else if (route.name === 'AudioToText') {
            iconName = 'file-audio'; // Ícono para la vista de audio
          } else if (route.name === 'Settings') {
            iconName = 'gear'; // Ícono para la vista de configuración
          } else if (route.name === 'Bluetooth') {
            iconName = 'link'; // Ícono para la vista de bluetooth
          }
          return (
            <FontAwesome6
              name={iconName}
              size={size}
              iconStyle="solid"
              color={color}
              style={{marginBottom: -3}} // Ajusta la posición del ícono
            />
          );
        },
        tabBarActiveTintColor: Colors.textPrimary, // Color del ícono activo
        tabBarInactiveTintColor: Colors.textSecondary, // Color del ícono inactivo
        borderTopWidth: 0,
        tabBarStyle: {
          backgroundColor: Colors.navBar,
          paddingBottom: 10,
          borderTopWidth: 0.2,
          height: 60,
          paddingTop: 10,
        }, // Estilo de la barra inferior
        tabBarLabel: () => null, // Deshabilita las etiquetas
      })}>
      <Tab.Screen name="Menu" component={Home} />
      <Tab.Screen name="Train" component={Training} />
      <Tab.Screen name="Bluetooth" component={ConnectDevice} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  React.useEffect(() => {
    const id = AsyncStorage.getItem('userId');
    if (id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn !== null && ( 
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={isLoggedIn ? 'MainTabs' : 'Login'}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="UpdateTrain" component={UpdateTrain} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          {/* Aquí puedes agregar más pantallas si es necesario */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
