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
}


export default ProfileService;
