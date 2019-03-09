import appConsts from '../config/appConsts';

const { ACTIONS } = appConsts;
const initialState = {
  name: '',
  os: 'win',
  subscription: '1110',
  client: 'ovpn',
  proto: 'ovpn',
  port: '80',
  server: '',
};

const vpnReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_VPN_NAME_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.CREATE_VPN_SELECTOR_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.CREATE_VPN_OS_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.SETUP_VPN:
      console.log(action.payload);
      return {
        ...state,
        name: action.payload.name,
        os: action.payload.os,
        subscription: action.payload.subscription.id,
        client: action.payload.client,
        proto: action.payload.proto,
        port: action.payload.port,
      };
    default:
      return state;
  }
};

export default vpnReducer;
