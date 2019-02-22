import appConsts from '../config/appConsts';


const { ACTIONS } = appConsts;

const getUserIP = () => ({
  type: ACTIONS.USER_GET_IP,

});
const getProfiles = () => ({
  type: ACTIONS.USER_GET_PROFILES,

});

const getSubscriptions = () => ({
  type: ACTIONS.USER_GET_SUBSCRIPTIONS,
});

export {
  getUserIP,
  getProfiles,
  getSubscriptions,
};
