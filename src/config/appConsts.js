class AppConsts {
  // optional backend: location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/profiles/";
  // static BACKEND_URL = localStorage.backUrl;

  static BACKEND_URL =
   'https://site.devtime.pw';


    static ACTIONS = {
      USER_GET_IP: 'USER_GET_IP',
      USER_GET_IP_START: 'USER_GET_IP_START',
      USER_GET_IP_DONE: 'USER_GET_IP_DONE',
      USER_GET_IP_FAIL: ' USER_GET_IP_FAIL',
      USER_GET_SUBSCRIPTIONS: 'USER_GET_SUBSCRIPTIONS',
      USER_GET_SUBSCRIPTIONS_START: 'USER_GET_SUBSCRIPTIONS_START',
      USER_GET_SUBSCRIPTIONS_DONE: 'USER_GET_SUBSCRIPTIONS_DONE',
      USER_GET_SUBSCRIPTIONS_FAIL: 'USER_GET_SUBSCRIPTIONS_FAIL',
      USER_GET_PROFILES: 'USER_GET_PROFILES',
      USER_GET_PROFILES_START: 'USER_GET_PROFILES_START',
      USER_GET_PROFILES_DONE: 'USER_GET_PROFILES_DONE',
      USER_GET_PROFILES_FAIL: 'USER_GET_PROFILES_FAIL',
      USER_GET_SERVERS: 'USER_GET_SERVERS',
      USER_GET_SERVERS_START: 'USER_GET_SERVERS_START',
      USER_GET_SERVERS_DONE: 'USER_GET_SERVERS_DONE',
      USER_GET_SERVERS_FAIL: 'USER_GET_SERVERS_FAIL',
      USER_GET_SERVER_PING_START: 'USER_GET_SERVER_PING_START',
      USER_GET_SERVER_PING_DONE: 'USER_GET_SERVER_PING_DONE',
      USER_GET_SERVER_PING_FAIL: 'USER_GET_SERVER_PING_FAIL',
      CREATE_VPN_NAME_CHANGE: 'CREATE_VPN_NAME_CHANGE',
      CREATE_VPN_SELECTOR_CHANGE: 'CREATE_VPN_SELECTOR_CHANGE',
      CREATE_VPN_OS_CHANGE: 'CREATE_VPN_OS_CHANGE',
      CREATE_PROFILE: 'CREATE_PROFILE',
      CREATE_PROFILE_START: 'CREATE_PROFILE_START',
      CREATE_PROFILE_DONE: 'CREATE_PROFILE_DONE',
      CREATE_PROFILE_FAIL: 'CREATE_PROFILE_FAIL',
      CREATE_PROXY_NAME_CHANGE: 'CREATE_PROXY_NAME_CHANGE',
      CREATE_PROXY_SELECTOR_CHANGE: 'CREATE_PROXY_SELECTOR_CHANGE',
      CREATE_PROFILE_PROXY: 'CREATE_PROFILE_PROXY',
      CREATE_PROXY_OS_CHANGE: 'CREATE_PROXY_OS_CHANGE',
      CREATE_PROFILE_PROXY_START: 'CREATE_PROFILE_PROXY_START',
      CREATE_PROFILE_PROXY_DONE: 'CREATE_PROFILE_PROXY_DONE',
      CREATE_PROFILE_PROXY_FAIL: 'CREATE_PROFILE_PROXY_FAIL',
      GET_PROFILE_INFO: 'GET_PROFILE_INFO',
      GET_PROFILE_INFO_START: 'GET_PROFILE_INFO_START',
      GET_PROFILE_INFO_DONE: 'GET_PROFILE_INFO_DONE',
      GET_PROFILE_INFO_FAIL: 'GET_PROFILE_INFO_FAIL',
      PROFILE_SELECTED: 'PROFILE_SELECTED',
    };

    static TEXT_PROTO = {
      ikev: 'iKEv2',
      l2tp: 'L2TP',
      pptp: 'PPTP',
    }
}

export default AppConsts;
