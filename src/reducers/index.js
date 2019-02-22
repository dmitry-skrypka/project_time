import { combineReducers } from 'redux';
import profilesReducer from './profilesReducer';
import vpnReducer from './vpnReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
  profiles: profilesReducer,
  vpn: vpnReducer,
  user: userReducer,
});

export default rootReducer;
