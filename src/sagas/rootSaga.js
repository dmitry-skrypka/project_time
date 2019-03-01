import {
  takeLatest, takeEvery, take,
} from 'redux-saga/effects';

import AppConsts from '../config/appConsts';
import {
  getUserIP, getProfileList, getSubscriptions, getServers, getServerPing,
} from './userSaga';
import { createProfile, deleteProfileById, getProfileById } from './profileSaga';


const { ACTIONS } = AppConsts;

export default function* () {
  yield takeEvery([ACTIONS.USER_GET_IP], getUserIP);
  yield takeLatest([ACTIONS.USER_GET_PROFILES], getProfileList);
  yield takeEvery([ACTIONS.USER_GET_SUBSCRIPTIONS], getSubscriptions);
  yield takeEvery([ACTIONS.CREATE_PROFILE], createProfile);
  yield takeEvery([ACTIONS.USER_GET_SERVERS], getServers);
  yield takeEvery([ACTIONS.USER_GET_SERVERS_DONE], getServerPing);
  yield takeEvery([ACTIONS.GET_PROFILE_INFO], getProfileById);
  yield takeEvery([ACTIONS.DELETE_PROFILE], deleteProfileById);
}
