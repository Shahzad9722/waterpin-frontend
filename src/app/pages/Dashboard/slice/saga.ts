import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { dashboardActions as actions } from '.';
import { request } from 'utils/request';
// import { selectPayload, selectError } from './selectors';
import { DashboardErrorType } from './types';
var os = require('os');

const host = window.location.protocol+"//"+process.env.REACT_APP_API_ROOT

// function* doSomething() {}
export function* getDashboardSaga() {
  yield delay(500);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  console.log("here in dashboardsaga")
  const requestURL = host + `/user/dashboard/`;
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = {
      encoding: 'utf8',
      headers: {
        'User-Agent': 'request',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: 'application/json',
      },
    };
    const response = yield call(request, requestURL, options);

    //console.log(response)
    if (response) {
      yield put(actions.dashboardLoaded(response));
    } else {
      yield put(
        actions.dashboardLoadedError(DashboardErrorType.RESPONSE_ERROR),
      );
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(
        actions.dashboardLoadedError(DashboardErrorType.RESPONSE_ERROR),
      );
    } else if (err.message === 'Failed to fetch') {
      yield put(
        actions.dashboardLoadedError(DashboardErrorType.RESPONSE_ERROR),
      );
    } else {
      yield put(
        actions.dashboardLoadedError(DashboardErrorType.RESPONSE_ERROR),
      );
    }
  }
}

export function* loadUserFleetSaga(action) {
  yield delay(100);

  const requestURL = host + `/listing/user/${action.payload.user_id}`;
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = {
      encoding: 'utf8',
      headers: {
        'User-Agent': 'request',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: 'application/json',
      },
    };
    const response = yield call(request, requestURL, options);

    //console.log(response)
    if (response) {
      yield put(actions.loadFleetListLoaded(response));
    } else {
      yield put(actions.loadFleetListError(DashboardErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.loadFleetListError(DashboardErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.loadFleetListError(DashboardErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.loadFleetListError(DashboardErrorType.RESPONSE_ERROR));
    }
  }
}

export function* dashboardSaga() {
  yield takeLatest(actions.getDashboardData.type, getDashboardSaga);
  yield takeLatest(actions.loadFleetList.type, loadUserFleetSaga);
}
