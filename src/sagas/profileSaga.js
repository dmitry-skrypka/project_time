import {
  call, put, select,
} from 'redux-saga/effects';
import { message } from 'antd';
import history from '../config/history';
import appConsts from '../config/appConsts';

import ProfileService from '../services/profileServices';
import UserService from '../services/userServices';

const { ACTIONS } = appConsts;

function* createProfile() {
  try {
    yield put({
      type: ACTIONS.CREATE_PROFILE_START,
    });
    const state = yield select();
    const {
      client, name, os, port, proto, subscription, server,
    } = state.vpn;
    const server_id = server;
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


function* getProfileById(action) {
  try {
    yield put({
      type: ACTIONS.GET_PROFILE_INFO_START,
    });

    const id = action.payload;

    const profile = yield call(ProfileService.getProfile, id);

    yield put({
      type: ACTIONS.GET_PROFILE_INFO_DONE,
      payload: profile.data.profile,

    });
  } catch (e) {
    yield put({
      type: ACTIONS.GET_PROFILE_INFO_FAIL,

    });
  }
}


export { createProfile, getProfileById };
