import {
  call, put, select,
} from 'redux-saga/effects';


import appConsts from '../config/appConsts';
import UserService from '../services/userServices';

const { ACTIONS } = appConsts;

function* getUserIP() {
  try {
    yield put({
      type: ACTIONS.USER_GET_IP_START,
    });
    const ip = yield call(UserService.getIP);


    yield put({
      type: ACTIONS.USER_GET_IP_DONE,
      payload: ip,

    });
  } catch (e) {
    yield put({
      type: ACTIONS.USER_GET_IP_FAIL,

    });
  }
}
function* getProfileList() {
  try {
    yield put({
      type: ACTIONS.USER_GET_PROFILES_START,
    });
    const profiles = yield call(UserService.getProfiles);

    yield put({
      type: ACTIONS.USER_GET_PROFILES_DONE,
      payload: profiles,

    });
  } catch (e) {
    yield put({
      type: ACTIONS.USER_GET_PROFILES_FAIL,

    });
  }
}
function* getSubscriptions() {
  try {
    yield put({
      type: ACTIONS.USER_GET_SUBSCRIPTIONS_START,
    });
    const subscriptions = yield call(UserService.getSubscriptions);

    yield put({
      type: ACTIONS.USER_GET_SUBSCRIPTIONS_DONE,
      payload: subscriptions,

    });
  } catch (e) {
    yield put({
      type: ACTIONS.USER_GET_PROFILES_FAIL,

    });
  }
}

export { getUserIP, getProfileList, getSubscriptions };
