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

export {
  vpnNameChange, vpnSelectorChange, vpnOsChange, createVpn,
};
