import { take, call, put, select, takeLatest, delay} from 'redux-saga/effects';
import { profileActions as actions } from '.';
import { request } from 'utils/request';
import { ProfilePageErrorType } from './types';
// function* doSomething() {}
var os = require("os");
const host = window.location.protocol+"//"+process.env.REACT_APP_API_ROOT

export function* getProfilePageSaga() {
  yield delay(500);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  const requestURL = host+`/user/dashboard/`;
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = { encoding: 'utf8', headers: {
      'User-Agent': 'request',
      'Content-Type': "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Accept': 'application/json'
      }
    }
    const response = yield call(request, requestURL, options);

    //console.log(response)
    if (response) {
      yield put(actions.profileLoaded(response));

    } else {
      yield put(actions.profileLoadedError(ProfilePageErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.profileLoadedError(ProfilePageErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.profileLoadedError(ProfilePageErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.profileLoadedError(ProfilePageErrorType.RESPONSE_ERROR));
    }
  }
}

export function* getProfilePageByUserIdSaga(action) {
  yield delay(500);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  const requestURL = host+`/user/profile/${action.payload.id}`;
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = { encoding: 'utf8', headers: {
      'User-Agent': 'request',
      'Content-Type': "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Accept': 'application/json'
      }
    }
    const response = yield call(request, requestURL, options);

    //console.log(response)
    if (response) {
      yield put(actions.getProfileByUserIdLoaded(response));

    } else {
      yield put(actions.getProfileByUserIdError(ProfilePageErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.getProfileByUserIdError(ProfilePageErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.getProfileByUserIdError(ProfilePageErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.getProfileByUserIdError(ProfilePageErrorType.RESPONSE_ERROR));
    }
  }
}

export function* profileSaga() {
  // yield takeLatest(actions.someAction.type, doSomething);
  yield takeLatest(actions.getProfile.type, getProfilePageSaga);
  yield takeLatest(actions.getProfileByUserId.type, getProfilePageByUserIdSaga);

}
