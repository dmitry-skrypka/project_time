import ping from 'web-pingjs';
import axios from '../config/axiosInstance';
import appConsts from '../config/appConsts';
import http_ping from '../components/helpers/pingJs';

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
    // const start = Date.now();
    // let deltaTime = 0;
    // const request = new XMLHttpRequest();
    // request.onreadystatechange = (event) => {
    //   if (request.readyState === 4) {
    //     deltaTime = Date.now() - start;
    //     console.log(deltaTime);
    //   }
    // };
    // request.open('GET', `https://${server.hostname}:444/ping/?${Math.random()}`);
    // request.send();
    // return deltaTime;
    // custom AXIOS
    // http_ping(server.hostname)
    const start = Date.now();
    let end;
    return axios(`https://${server.hostname}:444/ping/?${Math.random().toString(36).substring(7)}`, {
      method: 'GET',
      timeout: 2000,
    }).then(() => {
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
