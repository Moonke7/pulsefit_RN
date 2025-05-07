import 'react-native-gesture-handler'; // <-- Esto debe ser la primera importación
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
