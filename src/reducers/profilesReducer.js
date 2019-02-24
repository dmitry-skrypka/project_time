import appConsts from '../config/appConsts';

const { ACTIONS } = appConsts;


const initialState = {
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
    default:
      return state;
  }
};

export default profilesReducer;
