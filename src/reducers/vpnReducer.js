import appConsts from '../config/appConsts';

const { ACTIONS } = appConsts;
const initialState = {
  name: '',
  os: 'win',
  subscription: 'Free trial',
  client: 'ovpn',
  proto: 'ovpn',
  port: '80',
  server_id: 1,
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
    default:
      return state;
  }
};

export default vpnReducer;
