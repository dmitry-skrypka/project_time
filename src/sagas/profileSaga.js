import {
  call, put, select,
} from 'redux-saga/effects';
import { message } from 'antd';
import history from '../config/history';
import appConsts from '../config/appConsts';

import ProfileService from '../services/profileServices';

const { ACTIONS } = appConsts;

function* createProfile() {
  try {
    yield put({
      type: ACTIONS.CREATE_PROFILE_START,
    });
    const state = yield select();
    const {
      client, name, os, port, proto, subscription, server_id,
    } = state.vpn;

    const createProfileResponse = yield call(ProfileService.createProfile,
      client,
      name,
      os,
      port,
      proto,
      subscription,
      server_id);

    if (createProfileResponse.status === 200) {
      message.success('Profile Created');

      history.push('/');
    }
    // yield put({
    //   type: ACTIONS.CREATE_PROFILE_DONE,
    //   payload: createProfileResponse,
    //
    // });
  } catch (e) {
    yield put({
      type: ACTIONS.CREATE_PROFILE_FAIL,

    });
  }
}

export { createProfile };
