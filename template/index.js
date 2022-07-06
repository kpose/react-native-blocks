/**
 * @format
 */
/**
 * shim must be imported first to enable web3 work properly
 * @format
 */
import './shim';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
