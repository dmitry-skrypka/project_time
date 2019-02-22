import axios from '../config/axiosInstance';
import appConsts from '../config/appConsts';

class UserService {
  static getIP() {
    return axios.get(`${appConsts.BACKEND_URL}/app/v1/ip/`);
  }

  static getProfiles() {
    // axios.defaults.withCredentials = true;
    return axios(`${appConsts.BACKEND_URL}/app/v1/profiles/`, {
      method: 'GET',
      withCredentials: true,

    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err.response);
    });
  }

  static getSubscriptions() {
    return axios(`${appConsts.BACKEND_URL}/app/v1/current/`, {
      method: 'GET',
      withCredentials: true,

    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err.response);
    });
  }

  static getServers() {
    return axios(`${appConsts.BACKEND_URL}/app/v1/servers/`, {
      method: 'GET',
      withCredentials: true,

    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err.response);
    });
  }
}

export default UserService;
