import ping from 'web-pingjs';
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
    });
  }

  static getSubscriptions() {
    return axios(`${appConsts.BACKEND_URL}/app/v1/current/`, {
      method: 'GET',
      withCredentials: true,
    });
  }

  static getServers() {
    return axios(`${appConsts.BACKEND_URL}/app/v1/servers/`, {
      method: 'GET',
      withCredentials: true,
    });
  }

  static getServerPing(server) {
    // custom AXIOS
    const start = Date.now();
    let end;
    return axios(`https://${server.hostname}:444/ping/?${Math.random().toString(36).substring(7)}`, {
      method: 'GET',
      timeout: 2000,
    }).then((response) => {
      // if (response.status === 200) {
      end = Date.now() - start;
      return { ...server, ping: end };
      // }
    }).catch((error) => {
      console.log(error);
    });
    // web-pingjs
    // return ping(`https://${server.hostname}:444/ping/?${Math.random()}`)
  }
}

export default UserService;
