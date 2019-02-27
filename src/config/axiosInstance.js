import axios from 'axios';

function readCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


const sessionId = readCookie('sessionid');

const axiosInstance = axios.create({

  Cookie: sessionId || 'sessionid=w5vrpjbakv53k1abu7uirb0bo40dwzmh; path=/; domain=.site.devtime.pw; Expires=Tue, 19 Jan 2038 03:14:07 GMT;',
  // withCredentials: true,
});


export default axiosInstance;
