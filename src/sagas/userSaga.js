import {
  call, put, select, all,
} from 'redux-saga/effects';
import ping from 'web-pingjs';

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
      payload: subscriptions.data,

    });
  } catch (e) {
    yield put({
      type: ACTIONS.USER_GET_PROFILES_FAIL,

    });
  }
}

function* getServers() {
  try {
    yield put({
      type: ACTIONS.USER_GET_SERVERS_START,
    });
    const servers = yield call(UserService.getServers);

    yield put({
      type: ACTIONS.USER_GET_SERVERS_DONE,
      payload: servers,

    });
  } catch (e) {
    yield put({
      type: ACTIONS.USER_GET_SERVERS_FAIL,

    });
  }
}
function* getServerPing(action) {
  try {
    const { servers } = action.payload.data;
    yield put({
      type: ACTIONS.USER_GET_SERVER_PING_START,
    });

    const responses = yield all(servers.map(server => call(function* () {
      try {
        console.log(UserService.getServerPing(server));
        return yield call(UserService.getServerPing, server);
      } catch (err) {
        return { err };
      }
    })));

    const pings = yield all(responses.map(response => response));

    console.log(responses);
    console.log(pings);
    yield put({
      type: ACTIONS.USER_GET_SERVER_PING_DONE,
      payload: pings.sort((a, b) => a.ping - b.ping),

    });
  } catch (e) {
    yield put({
      type: ACTIONS.USER_GET_SERVER_PING_FAIL,


    });
  }
}

export {
  getUserIP, getProfileList, getSubscriptions, getServers, getServerPing,
};
