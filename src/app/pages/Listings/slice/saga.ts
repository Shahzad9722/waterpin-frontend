import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { listingActions as actions } from '.';
import { request } from 'utils/request';
import { ListingErrorType } from './types';
import {
  selectPageNum,
} from './selectors';

const os = require("os");
const host = window.location.protocol+"//"+process.env.REACT_APP_API_ROOT



export function* searchSaga(action) {
  yield delay(100);

  const page_num: string = yield select(selectPageNum);

  const requestURL = host+`/listing/?list_type=${action.payload.list_type}&&location=${action.payload.location}&&duration=${action.payload.duration}&&start_charter=${action.payload.start_charter}&&end_charter=${action.payload.end_charter}&&size_min=${action.payload.filter_size_min}&&size_max=${action.payload.filter_size_max}&&price_min=${action.payload.filter_price_min}&&price_max=${action.payload.filter_price_max}&&water_toys=${action.payload.filter_water_toys}&&more=${action.payload.filter_more_filter}&&page=${action.payload.page_num}&&count=5`;
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
      yield put(actions.searchLoaded(response));
    } else {
      yield put(actions.searchError(ListingErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.searchError(ListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.searchError(ListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.searchError(ListingErrorType.RESPONSE_ERROR));
    }
  }
}


export function* autoCompleteSaga(action) {
  yield delay(100);

  const requestURL = host+`/search/autocomplete?search=${action.payload.location}`;
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
      yield put(actions.autocompleteLocationLoaded(response));
    } else {
      yield put(actions.autocompleteLocationError(ListingErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.autocompleteLocationError(ListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.autocompleteLocationError(ListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.autocompleteLocationError(ListingErrorType.RESPONSE_ERROR));
    }
  }
}

export function* getAllUserListingsSaga(action) {
  yield delay(100);

  const requestURL = host+`/listing/user/${action.payload.id}`;
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
      yield put(actions.getAllUserListingsSuccessful(response));
    } else {
      yield put(actions.getAllUserListingsError(ListingErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.getAllUserListingsError(ListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.getAllUserListingsError(ListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.getAllUserListingsError(ListingErrorType.RESPONSE_ERROR));
    }
  }
}

export function* loadListingDetailSaga(action) {
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
      yield put(actions.loadListingDetailSuccessful(response));
    } else {
      yield put(actions.loadListingDetailError(ListingErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.loadListingDetailError(ListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.loadListingDetailError(ListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.loadListingDetailError(ListingErrorType.RESPONSE_ERROR));
    }
  }
}


export function* loadListingPricingSaga(action) {
  yield delay(300);

  console.log(action.payload)

  const requestURL = host+`/listing/${action.payload.id}/pricing`;
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

    //console.log(response)
    if (response) {
      yield put(actions.getListingPricingLoaded(response));
    } else {
      yield put(actions.getListingPricingError(ListingErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.getListingPricingError(ListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.getListingPricingError(ListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.getListingPricingError(ListingErrorType.RESPONSE_ERROR));
    }
  }
}

export function* pmIntentSaga(action) {
  yield delay(300);

  const requestURL = host+`/billing/payment-intent`;
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

    //console.log(response)
    if (response) {
      yield put(actions.createPaymentIntentSuccessful(response));
    } else {
      yield put(actions.createPaymentIntentError(ListingErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.createPaymentIntentError(ListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.createPaymentIntentError(ListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.createPaymentIntentError(ListingErrorType.RESPONSE_ERROR));
    }
  }
}


export function* checkoutSaga(action) {
  yield delay(700);

  console.log(action.payload)

  const requestURL = host+`/billing/charge`;
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
    //const response = yield call(request, requestURL, options);

    //console.log(response)
    // if (response) {
    //   yield put(actions.bookListingSuccessful(response));
    // } else {
    //   yield put(actions.bookListingError(ListingErrorType.RESPONSE_ERROR));
    // }

    yield put(actions.bookListingError(ListingErrorType.RESPONSE_ERROR));

  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.bookListingError(ListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.bookListingError(ListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.bookListingError(ListingErrorType.RESPONSE_ERROR));
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
      yield put(actions.favoriteListingError(ListingErrorType.RESPONSE_ERROR));
    }

    yield put(actions.favoriteListingError(ListingErrorType.RESPONSE_ERROR));

  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.favoriteListingError(ListingErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.favoriteListingError(ListingErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.favoriteListingError(ListingErrorType.RESPONSE_ERROR));
    }
  }
}





export function* listingSaga() {
  yield takeLatest(actions.search.type, searchSaga);
  yield takeLatest(actions.autocompleteLocation.type, autoCompleteSaga);

  yield takeLatest(actions.getAllUserListings.type, getAllUserListingsSaga);
  yield takeLatest(actions.loadListingDetail.type, loadListingDetailSaga);
  yield takeLatest(actions.getListingPricing.type, loadListingPricingSaga);

  yield takeLatest(actions.bookListing.type, checkoutSaga);

  yield takeLatest(actions.createPaymentIntent.type, pmIntentSaga);
  yield takeLatest(actions.favoriteListing.type, favoriteListingSaga);




}
