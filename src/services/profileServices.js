import axios from '../config/axiosInstance';
import appConsts from '../config/appConsts';

class ProfileService {
  static createProfile(client, name, os, port, proto, subscription, server_id) {
    // axios.defaults.withCredentials = true;
    return axios(`${appConsts.BACKEND_URL}/app/v1/profiles/`, {
      method: 'POST',
      withCredentials: true,
      params: {
        client, name, os, port, proto, subscription, server_id,
      },
    });
  }


  static getProfile(id) {
    return axios(`${appConsts.BACKEND_URL}/app/v1/profile/${id}/`, {
      method: 'GET',
      withCredentials: true,

    });
  }

  static deleteProfile(id) {
    // axios.defaults.withCredentials = true;
    return axios(`${appConsts.BACKEND_URL}/app/v1/profiles/`, {
      method: 'DELETE',
      withCredentials: true,
      params: {
        profile_id: id,
      },
    });
  }

  static downloadConfigFile(id) {
    return axios(`${appConsts.BACKEND_URL}/app/v1/config/${id}/`, {
      method: 'GET',
      withCredentials: true,

    }).then((response) => {
      console.log(response)
      const url = window.URL.createObjectURL(new Blob([response.config]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = 'test.txt';// whatever your file name .
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();// you need to remove that elelment which is created before.
    });
  }
}


export default ProfileService;
