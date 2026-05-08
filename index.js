import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('flyo', () => App);

// For web
if (typeof document !== 'undefined') {
  AppRegistry.runApplication('flyo', {
    initialProps: {},
    rootTag: document.getElementById('root'),
  });
}