import { combineReducers } from 'redux';
import profilesReducer from './profilesReducer';
import vpnReducer from './vpnReducer';
import userReducer from './userReducer';
import proxyReducer from './proxyReducer';

const rootReducer = combineReducers({
  profiles: profilesReducer,
  vpn: vpnReducer,
  user: userReducer,
  proxy: proxyReducer,
});

export default rootReducer;
