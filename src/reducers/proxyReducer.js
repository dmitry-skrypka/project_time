import appConsts from '../config/appConsts';

const { ACTIONS } = appConsts;
const initialState = {
  name: '',
  subscription: 'Free trial',
  client: 'proxy',
  server: '',
};

const proxyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_PROXY_NAME_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.CREATE_PROXY_SELECTOR_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.CREATE_PROXY_OS_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default proxyReducer;
