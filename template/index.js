/**
 * @format
 */

import 'react-native-gesture-handler';
import './shim';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
