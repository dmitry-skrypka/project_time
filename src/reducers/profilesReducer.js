import appConsts from '../config/appConsts';

const { ACTIONS } = appConsts;


const initialState = {
  selectedTab: '1',
  selectedProfileID: '',
  selectedProfile: {
    client_soft: '',
    connect: null,
    connected: false,
    disable: false,
    domain: '',
    histories: [],
    online: '',
    os: '',
    password: '',
    port: 0,
    ports: [],
    proto: '',
    protocol: '',
    server: {},
    session: null,
    switch_ips: {},
    tags: [],
    username: '',
  },
  profiles: [],
  proxies: [],
  shadowsocks: [],
};

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.USER_GET_PROFILES_DONE:
      return {
        ...state,
        profiles: action.payload.data.profiles,
        proxies: action.payload.data.proxies,
        shadowsocks: action.payload.data.shadowsocks,
      };
    case ACTIONS.PROFILE_SELECTED:
      return {
        ...state,
        selectedProfileID: action.payload,
      };

    case ACTIONS.GET_PROFILE_INFO_DONE:

      return {
        ...state,
        selectedProfile: action.payload,
      };
    case ACTIONS.SET_TAB:

      return {
        ...state,
        selectedTab: action.payload,
      };
    default:
      return state;
  }
};

export default profilesReducer;
