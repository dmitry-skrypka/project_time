import appConsts from '../config/appConsts';


const { ACTIONS } = appConsts;

const vpnNameChange = name => ({
  type: ACTIONS.CREATE_VPN_NAME_CHANGE,
  payload: name,
});
const vpnSelectorChange = value => ({
  type: ACTIONS.CREATE_VPN_SELECTOR_CHANGE,
  payload: value,
});
const vpnOsChange = os => ({
  type: ACTIONS.CREATE_VPN_OS_CHANGE,
  payload: os,
});

const createVpn = () => ({
  type: ACTIONS.CREATE_PROFILE,
});


const proxyNameChange = name => ({
  type: ACTIONS.CREATE_PROXY_NAME_CHANGE,
  payload: name,
});
const proxySelectorChange = value => ({
  type: ACTIONS.CREATE_PROXY_SELECTOR_CHANGE,
  payload: value,
});
const proxyOsChange = os => ({
  type: ACTIONS.CREATE_PROXY_OS_CHANGE,
  payload: os,
});
const createProxy = () => ({
  type: ACTIONS.CREATE_PROFILE_PROXY,
});
const getProfileInfo = id => ({
  type: ACTIONS.GET_PROFILE_INFO,
  payload: id,
});
const onProfileSelect = id => ({
  type: ACTIONS.PROFILE_SELECTED,
  payload: id,
});
export {
  vpnNameChange,
  vpnSelectorChange,
  vpnOsChange,
  createVpn,
  proxyNameChange,
  proxySelectorChange,
  createProxy,
  proxyOsChange,
  getProfileInfo,
  onProfileSelect,
};
