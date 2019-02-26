import ping from 'web-pingjs';
import axios from '../config/axiosInstance';
import appConsts from '../config/appConsts';
import http_ping from '../helpers/pingJs';

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
    // let i = 0;
    // const NB_ITERATIONS = 3; // number of loop iterations
    // const MAX_ITERATIONS = 4; // beware: the number of simultaneous XMLHttpRequest is limited by the browser!
    // const TIME_PERIOD = 2000; // 1000 ms between each ping
    //
    // let timeCumul = 0;
    // const REQUEST_TIMEOUT = 5000;
    // let TIMEOUT_ERROR = 0;
    // let FAIL_ERROR = 0;
    // const url = `https://${server.hostname}:444/ping/??${Math.random().toString(36).substring(7)}}`;
    // const ping_loop = setInterval(() => {
    //
    //   if (i < MAX_ITERATIONS) {
    //     i++;
    //     return new Promise((resolve, reject) => {
    //       let overFlag = 0;
    //       const start = Date.now();
    //       let deltaTime = 0;
    //       const xhr = new XMLHttpRequest();
    //       xhr.seq = i;
    //       overFlag++;
    //       xhr.timeout = 5000;
    //       xhr.open('GET', url, true);
    //       xhr.onreadystatechange = () => {
    //         if (xhr.readyState === 4 && TIMEOUT_ERROR === 0) {
    //           overFlag--;
    //
    //           if (xhr.seq > 1) {
    //             deltaTime = Date.now() - start;
    //             timeCumul += deltaTime;
    //
    //
    //             // return deltaTime;
    //           }
    //         }
    //       };
    //       xhr.ontimeout = function () {
    //         TIMEOUT_ERROR = 1;
    //       };
    //
    //       xhr.onerror = function () {
    //         FAIL_ERROR = 1;
    //       };
    //       xhr.onerror = () => reject(xhr.statusText);
    //       xhr.send();
    //       let avg_time;
    //
    //       if ((i > NB_ITERATIONS) && (overFlag <= 1)) { // all requests are passed and have returned
    //         clearInterval(ping_loop);
    //
    //         avg_time = Math.round(timeCumul / (i - 2));
    //         // if (avg_time < 100) { status = 'success'; } else { status = 'info'; }
    //         console.log(`Average ping (${url}) latency on ${i - 1} iterations: ${avg_time}ms`);
    //
    //         return avg_time;
    //       }
    //     });
    //   }
    // const request =>   new Promise((resolve, reject) => { new XMLHttpRequest();
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
    // }, TIME_PERIOD);
    // return ping_loop;
  }
}

export default UserService;
