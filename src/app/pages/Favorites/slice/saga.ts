import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { favoritesActions as actions } from '.';
import { request } from 'utils/request';
import { FavoritesErrorType } from './types';

const os = require("os");
const host = window.location.protocol+"//"+process.env.REACT_APP_API_ROOT


export function* getUserFavoritesSaga(action) {
  yield delay(100);

  const requestURL = host+`/user/favorites`;
  try {
    var options = { encoding: 'utf8', method:"GET", headers: {
      'User-Agent': 'request',
      'Content-Type': "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Accept': 'application/json'
      }
    }
    const response = yield call(request, requestURL, options);

    if (response) {
      yield put(actions.getUserFavoritesSuccessful(response));
    } else {
      yield put(actions.getUserFavoritesError(FavoritesErrorType.RESPONSE_ERROR));
    }

    yield put(actions.getUserFavoritesError(FavoritesErrorType.RESPONSE_ERROR));

  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.getUserFavoritesError(FavoritesErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.getUserFavoritesError(FavoritesErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.getUserFavoritesError(FavoritesErrorType.RESPONSE_ERROR));
    }
  }
}

export function* favoriteListingSaga(action) {
  yield delay(100);

  const requestURL = host+`/user/favorites`;
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = { encoding: 'utf8', body:JSON.stringify(action.payload), method:"POST", headers: {
      'User-Agent': 'request',
      'Content-Type': "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Accept': 'application/json'
      }
    }
    const response = yield call(request, requestURL, options);

    if (response) {
      yield put(actions.favoriteListingSuccessful(response));
    } else {
      yield put(actions.favoriteListingError(FavoritesErrorType.RESPONSE_ERROR));
    }

    yield put(actions.favoriteListingError(FavoritesErrorType.RESPONSE_ERROR));

  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.favoriteListingError(FavoritesErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.favoriteListingError(FavoritesErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.favoriteListingError(FavoritesErrorType.RESPONSE_ERROR));
    }
  }
}

export function* unfavoriteListingSaga(action) {
  yield delay(100);

  const requestURL = host+`/user/favorites`;
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = { encoding: 'utf8', body:JSON.stringify(action.payload), method:"DELETE", headers: {
      'User-Agent': 'request',
      'Content-Type': "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Accept': 'application/json'
      }
    }
    const response = yield call(request, requestURL, options);

    if (response) {
      yield put(actions.unfavoriteListingSuccessful(response));
    } else {
      yield put(actions.unfavoriteListingError(FavoritesErrorType.RESPONSE_ERROR));
    }

    yield put(actions.unfavoriteListingError(FavoritesErrorType.RESPONSE_ERROR));

  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.unfavoriteListingError(FavoritesErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.unfavoriteListingError(FavoritesErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.unfavoriteListingError(FavoritesErrorType.RESPONSE_ERROR));
    }
  }
}



export function* favoritesSaga() {
  yield takeLatest(actions.getUserFavorites.type, getUserFavoritesSaga);
  yield takeLatest(actions.favoriteListing.type, favoriteListingSaga);
  yield takeLatest(actions.unfavoriteListing.type, unfavoriteListingSaga);
}
