import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { tripsActions as actions } from '.';
import { TripsErrorType } from './types';
import { request } from 'utils/request';
var os = require("os");
const host = window.location.protocol+"//"+process.env.REACT_APP_API_ROOT

// function* doSomething() {}

export function* getAllTripsSaga() {
  yield delay(100);

  const requestURL = host+`/user/trips/all/`;
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
      yield put(actions.getAllTripsLoaded(response));

    } else {
      yield put(actions.getAllTripsError(TripsErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.getAllTripsError(TripsErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.getAllTripsError(TripsErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.getAllTripsError(TripsErrorType.RESPONSE_ERROR));
    }
  }
}

export function* getAllBookingsSaga() {
  yield delay(100);

  const requestURL = host+`/user/trips/owner/`;
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
      yield put(actions.getAllBookingsLoaded(response));

    } else {
      yield put(actions.getAllBookingsError(TripsErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.getAllBookingsError(TripsErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.getAllBookingsError(TripsErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.getAllBookingsError(TripsErrorType.RESPONSE_ERROR));
    }
  }
}

export function* tripsSaga() {
  yield takeLatest(actions.getAllTrips.type, getAllTripsSaga);
  yield takeLatest(actions.getAllBookings.type, getAllBookingsSaga);

}
