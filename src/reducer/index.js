/*********** Reduceres defined here *********/

import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import { routerReducer as router } from 'react-router-redux';
import user from './modules/user';
import encryptor from './encryptor';
import columns from './modules/header-columns';

const userPersistConfig = {
  key: 'core-web',
  storage: storage,
  transforms: [encryptor],
  blacklist: ['isLoading']
};

export default persistCombineReducers(userPersistConfig, {
  user,
  columns,
  router
});
