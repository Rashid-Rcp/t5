/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Home from './screens/test/AudioTest';
import {name as appName} from './app.json';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Constants.']); // Ignore log notification by message , ignoring expo constants warning.
//LogBox.ignoreAllLogs();//Ignore all log notifications
AppRegistry.registerComponent(appName, () => Home);
