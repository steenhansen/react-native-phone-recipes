
import { AppRegistry } from 'react-native';
import { name } from './src/app.json';

import { WrapA_Redux_Back } from './src/wrap-a-redux-back';
import { ASSUME_SERVER_CONNECTABLE_START } from './src/constants';

global.SERVER_IS_CONNECTABLE = ASSUME_SERVER_CONNECTABLE_START;

AppRegistry.registerComponent(name, () => WrapA_Redux_Back)
