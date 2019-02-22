import appConsts from '../config/appConsts';

const { ACTIONS } = appConsts;


const initialState = {
  data: {},
  subscriptions: [{ name: 'Free trial', remaining: 2 }],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.USER_GET_IP_DONE:
      return {
        ...state,
        data: action.payload.data,
      };
    // case ACTIONS.USER_GET_SUBSCRIPTIONS_DONE:
    //   return {
    //     ...action.payload,
    //   };
    default:
      return state;
  }
};

export default userReducer;
