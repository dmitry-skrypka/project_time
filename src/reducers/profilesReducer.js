import appConsts from '../config/appConsts';

const { ACTIONS } = appConsts;


const initialState = {
  profiles: {},
};

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.USER_GET_PROFILES_DONE:
      return {
        ...state,
        profiles: action.payload,
      };
    default:
      return state;
  }
};

export default profilesReducer;
