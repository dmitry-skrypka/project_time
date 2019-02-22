import {
  takeLatest, takeEvery,
} from 'redux-saga/effects';

import AppConsts from '../config/appConsts';
import { getUserIP, getProfileList, getSubscriptions } from './userSaga';
import { createProfile } from './profileSaga';


const { ACTIONS } = AppConsts;

export default function* () {
  yield takeEvery([ACTIONS.USER_GET_IP], getUserIP);
  yield takeLatest([ACTIONS.USER_GET_PROFILES], getProfileList);
  yield takeEvery([ACTIONS.USER_GET_SUBSCRIPTIONS], getSubscriptions);
  yield takeEvery([ACTIONS.CREATE_PROFILE], createProfile);
}
