import appConsts from '../config/appConsts';

const { ACTIONS } = appConsts;

const initialState = {
  data: {},
  subscriptions: [{ name: 'Free trial', remaining: 2 }],
  servers: [
    {
      country: 'Ukraine',
      country_code: 'ua',
      hostname: 'ua.timevpn.com',
      ip: '130.0.233.20',
      location: 'Umbriel',
      name: 'Kiev',
      network: { percent: 0, mbits: 0 },
      online: false,
      ping: 30,
    },
  ],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.USER_GET_IP_DONE:
      return {
        ...state,
        data: action.payload.data,
      };
    case ACTIONS.USER_GET_SUBSCRIPTIONS_DONE:
      return {
        ...state,
        subscriptions: action.payload.subscriptions,
      };
    case ACTIONS.USER_GET_SERVER_PING_DONE:


      return {
        ...state,
        servers: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
