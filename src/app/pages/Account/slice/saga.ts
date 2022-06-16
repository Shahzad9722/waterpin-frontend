import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { accountActions as actions } from '.';
import { appActions } from '../../../slice';

import { request } from 'utils/request';
import {
  selectPayload,
  selectError,
  selectNotificationSettings,
} from './selectors';
import { AccountErrorType } from './types';
var os = require('os');
const host = window.location.protocol+"//"+process.env.REACT_APP_API_ROOT

// function* doSomething() {}
export function* getAccountSaga() {
  yield delay(500);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  const requestURL = host + `/user/`;
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
      yield put(actions.accountLoaded(response));
    } else {
      yield put(actions.accountLoadedError(AccountErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.accountLoadedError(AccountErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.accountLoadedError(AccountErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.accountLoadedError(AccountErrorType.RESPONSE_ERROR));
    }
  }
}

export function* updateAccountSaga(action) {
  yield delay(500);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  const requestURL = host + `/user/`;
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = {
      body: JSON.stringify(action.payload),
      method: 'PATCH',
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
      yield put(actions.updateAccountLoaded(response));
    } else {
      yield put(actions.updateAccountError(AccountErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.updateAccountError(AccountErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.updateAccountError(AccountErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.updateAccountError(AccountErrorType.RESPONSE_ERROR));
    }
  }
}

export function* updateAccountSuccessSaga(payload) {
  yield delay(100);
  yield put(
    appActions.notify({
      msg: 'Account update successful!',
      severity: 'success',
    }),
  );
}

export function* updateAccountFailedSaga(payload) {
  yield delay(100);
  yield put(
    appActions.notify({
      msg: 'Account update unsucessful! Please try again or contact support for assistance.',
      severity: 'error',
    }),
  );
}

export function* pmSetupIntentSaga() {
  yield delay(500);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  const requestURL = host + `/billing/add-pm-method-intent`;
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
      yield put(actions.loadPaymentSetupIntentLoaded(response));
    } else {
      yield put(
        actions.loadPaymentSetupIntentError(AccountErrorType.RESPONSE_ERROR),
      );
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(
        actions.loadPaymentSetupIntentError(AccountErrorType.RESPONSE_ERROR),
      );
    } else if (err.message === 'Failed to fetch') {
      yield put(
        actions.loadPaymentSetupIntentError(AccountErrorType.RESPONSE_ERROR),
      );
    } else {
      yield put(
        actions.loadPaymentSetupIntentError(AccountErrorType.RESPONSE_ERROR),
      );
    }
  }
}

export function* pmAddSaga(action) {
  yield delay(500);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  const requestURL = host + `/billing/create-stripe-card`;
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = {
      body: JSON.stringify(action.payload),
      method: 'POST',
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
      yield put(actions.addPaymentMethodLoaded(response));
    } else {
      yield put(actions.addPaymentMethodError(AccountErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.addPaymentMethodError(AccountErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.addPaymentMethodError(AccountErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.addPaymentMethodError(AccountErrorType.RESPONSE_ERROR));
    }
  }
}

export function* pmAddSuccessSaga(payload) {
  yield delay(100);
  yield put(
    appActions.notify({
      msg: 'Added new card successfully!',
      severity: 'success',
    }),
  );
}

export function* pmAddFailureSaga(payload) {
  yield delay(100);
  yield put(
    appActions.notify({
      msg: 'Adding a new card unsucessful! Please try again or contact support for assistance.',
      severity: 'error',
    }),
  );
}

export function* updateNotificationSettingsSaga(action) {
  yield delay(500);
  // Select username from store
  const notifSettings: any = yield select(selectNotificationSettings);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  const requestURL = host + `/user/notifications/settings/`;
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = {
      encoding: 'utf8',
      method: 'PATCH',
      body: JSON.stringify(notifSettings),
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
      yield put(actions.updateNotificationSettingsLoaded(response));
    } else {
      yield put(
        actions.updateNotificationSettingsError(
          AccountErrorType.RESPONSE_ERROR,
        ),
      );
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(
        actions.updateNotificationSettingsError(
          AccountErrorType.RESPONSE_ERROR,
        ),
      );
    } else if (err.message === 'Failed to fetch') {
      yield put(
        actions.updateNotificationSettingsError(
          AccountErrorType.RESPONSE_ERROR,
        ),
      );
    } else {
      yield put(
        actions.updateNotificationSettingsError(
          AccountErrorType.RESPONSE_ERROR,
        ),
      );
    }
  }
}

export function* updateNotificationSettingsLoadedSaga(payload) {
  yield delay(100);
  yield put(
    appActions.notify({
      msg: 'Notification settings changed successfully!',
      severity: 'success',
    }),
  );
}

export function* updateNotificationSettingsFailedSaga(payload) {
  yield delay(100);
  yield put(
    appActions.notify({
      msg: 'Notification settings unsucessful! Please try again or contact support for assistance.',
      severity: 'error',
    }),
  );
}

export function* toggleTwoStepSaga(action) {
  console.log('res', action.payload.isChecked);
  yield delay(100);
  const requestURL = host + `/auth/toggle-two-step/`;
  console.log('reqUrl', requestURL);
  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = {
      body: JSON.stringify(action.payload),
      method: 'POST',
      encoding: 'utf8',
      headers: {
        'User-Agent': 'request',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const response = yield call(request, requestURL, options);

    console.log('response', response);
    if (response) {
      yield put(actions.successToggleTwoStep(response));
      if (action.payload.isChecked) {
        yield put(
          appActions.notify({
            msg: 'Two Step Authentication Enabled!',
            severity: 'success',
          }),
        );
      } else {
        yield put(
          appActions.notify({
            msg: 'Two Step Authentication Disabled!',
            severity: 'success',
          }),
        );
      }
    } else {
      yield put(actions.toggleTwoStepError(AccountErrorType.RESPONSE_ERROR));
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      yield put(actions.toggleTwoStepError(AccountErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.toggleTwoStepError(AccountErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.toggleTwoStepError(AccountErrorType.RESPONSE_ERROR));
    }
  }
}


export function* inviteFriendSaga(action) {
  yield delay(100);

  const requestURL = host + `/user/invite/`;
  try {
    // Call our request helper (see 'utils/request')
    var options = {
      body: JSON.stringify(action.payload),
      method: 'POST',
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
      yield put(actions.inviteFriendSuccess(response));
    } else {
      yield put(actions.inviteFriendError(AccountErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.inviteFriendError(AccountErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.inviteFriendError(AccountErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.inviteFriendError(AccountErrorType.RESPONSE_ERROR));
    }
  }
}


export function* inviteFriendSuccessSaga(payload) {
  yield delay(100);
  yield put(
    appActions.notify({
      msg: 'Your invite was sent successfully!',
      severity: 'success',
    }),
  );
}

export function* inviteFriendFailedSaga(payload) {
  yield delay(100);
  yield put(
    appActions.notify({
      msg: 'Invite was unsucessful! Please try again or contact support for assistance.',
      severity: 'error',
    }),
  );
}

export function* accountSaga() {
  yield takeLatest(actions.loadAccount.type, getAccountSaga);
  yield takeLatest(actions.updateAccount.type, updateAccountSaga);
  yield takeLatest(actions.updateAccountLoaded.type, updateAccountSuccessSaga);
  yield takeLatest(actions.updateAccountError.type, updateAccountFailedSaga);

  yield takeLatest(actions.loadPaymentSetupIntent.type, pmSetupIntentSaga);
  yield takeLatest(actions.addPaymentMethod.type, pmAddSaga);
  yield takeLatest(actions.addPaymentMethodLoaded.type, pmAddSuccessSaga);
  yield takeLatest(actions.addPaymentMethodError.type, pmAddFailureSaga);
  yield takeLatest(
    actions.updateNotificationSettings.type,
    updateNotificationSettingsSaga,
  );

  yield takeLatest(
    actions.updateNotificationSettingsLoaded.type,
    updateNotificationSettingsLoadedSaga,
  );
  yield takeLatest(
    actions.updateNotificationSettingsError.type,
    updateNotificationSettingsFailedSaga,
  );

  yield takeLatest(actions.toggleTwoStep.type, toggleTwoStepSaga);

  yield takeLatest(actions.inviteFriend.type, inviteFriendSaga);
  yield takeLatest(actions.inviteFriendSuccess.type, inviteFriendSuccessSaga);
  yield takeLatest(actions.inviteFriendError.type, inviteFriendFailedSaga);
}
