// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { destinationsActions as actions } from '.';

// function* doSomething() {}
import { call, put, delay, takeLatest, select } from 'redux-saga/effects';
import { request } from 'utils/request';
import { DestinationErrorType } from './types';
import { destinationsActions as actions } from '.';

var os = require('os');
const host = window.location.protocol + '//' + process.env.REACT_APP_API_ROOT;

export function* destinationSaga(action) {
  // yield takeLatest(actions.someAction.type, doSomething);
  yield delay(500);
  const requestURL =
    host +
    `/destinations?count=15&&type=destinations&&page=${action.payload.page_num}&&city_province=${action.payload.state}`;

  try {
    var options = {
      encoding: 'utf8',
      headers: {
        'User-Agent': 'request',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: 'application/json',
      },
    };
    console.log('req', requestURL);
    console.log('Action.payload->', action.payload);
    const response = yield call(request, requestURL, options);
    console.log('response', response);
    if (response) {
      yield put(actions.destinationsLoaded(response));
    } else {
      yield put(actions.destinationsError(DestinationErrorType.RESPONSE_ERROR));
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.destinationsError(DestinationErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.destinationsError(DestinationErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.destinationsError(DestinationErrorType.RESPONSE_ERROR));
    }
  }
}

export function* destinationsSaga() {
  yield takeLatest(actions.getDestinations.type, destinationSaga);
}
