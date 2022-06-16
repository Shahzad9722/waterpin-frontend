import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { listcreationActions as actions } from '.';
import { appActions } from '../../../../slice';

import { request } from 'utils/request';
import { selectPayload, selectError } from './selectors';
import { CreateListingErrorType } from './types';

var os = require("os");
const host = window.location.protocol+"//"+process.env.REACT_APP_API_ROOT


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function* createListingSaga(action) {
  yield delay(100);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
    let listingPayload:any = Object.assign({}, action.payload.listing)
    delete listingPayload.images
    listingPayload.rules = JSON.stringify(listingPayload.rules)

    const formData = new FormData();
    formData.append("listing", JSON.stringify(listingPayload));
    formData.append("exterior", JSON.stringify(action.payload.exterior));
    formData.append("water_toys", JSON.stringify(action.payload.water_toys));
    formData.append("safety", JSON.stringify(action.payload.safety));
    formData.append("interior", JSON.stringify(action.payload.interior));
    formData.append("day_trips", JSON.stringify(action.payload.day_trips));
    formData.append("overnight_stays", JSON.stringify(action.payload.overnight_stays));
    formData.append("cancelation_policy", JSON.stringify(action.payload.cancelation_policy));
    formData.append("insurance", JSON.stringify(action.payload.insurance));
    formData.append("availability", JSON.stringify(action.payload.availability));
    formData.append("water_activity", JSON.stringify(action.payload.water_activity));

    for (const file in action.payload.listing.images) {
      formData.append(`files[]`, action.payload.listing.images[file]);
    }

  const requestURL = host+`/listing/`;
  try {
    // Call our request helper (see 'utils/request')

    var options = { encoding: 'utf8', body:formData, method: 'POST', headers: {
      'User-Agent': 'request',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Accept': 'application/json'
      }
    }
    //const repos: Repo[] = yield call(request, requestURL);
    // var options = { body: JSON.stringify(action.payload) ,method: 'POST', encoding: 'utf8', headers: {
    //   'User-Agent': 'request',
    //   'Content-Type': "application/json",
    //   'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //   'Accept': 'application/json'
    //   }
    // }
    const response = yield call(request, requestURL, options);

    //console.log(response)
    if (response) {
      yield put(actions.createListingSuccessful(response));

    } else {
      yield put(actions.createListingError(CreateListingErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.createListingError(CreateListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.createListingError(CreateListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.createListingError(CreateListingErrorType.RESPONSE_ERROR));
    }
  }
}

export function* createListingSuccessSaga(payload) {
  yield delay(100);
  yield put(appActions.notify({msg:"Listing creation successful! Redirecting...", severity:"success"}));

}

export function* createListingFailedSaga(payload) {
  yield delay(100);
  yield put(appActions.notify({msg:"Listing creation unsucessful! Please try again or contact support for assistance.", severity:"error"}));
}


export function* loadListingSaga(action) {
  yield delay(100);

  const requestURL = host+`/listing/${action.payload.id}`;
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
      yield put(actions.loadListingSuccessful(response));
    } else {
      yield put(actions.loadListingError(CreateListingErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.loadListingError(CreateListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.loadListingError(CreateListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.loadListingError(CreateListingErrorType.RESPONSE_ERROR));
    }
  }
}

export function* loadListingSuccessSaga(payload) {
  yield delay(100);
  yield put(appActions.notify({msg:"Listing loaded successful! You may now edit...", severity:"success"}));

}

export function* loadListingFailedSaga(payload) {
  yield delay(100);
  yield put(appActions.notify({msg:"Listing loaded unsucessfully! Please refresh or contact support for assistance.", severity:"error"}));
}


export function* listcreationSaga() {
  yield takeLatest(actions.createListing.type, createListingSaga);
  yield takeLatest(actions.createListingSuccessful.type, createListingSuccessSaga);
  yield takeLatest(actions.createListingError.type, createListingFailedSaga);

  yield takeLatest(actions.loadListing.type, loadListingSaga);
  yield takeLatest(actions.loadListingSuccessful.type, loadListingSuccessSaga);
  yield takeLatest(actions.loadListingError.type, loadListingFailedSaga);

}
