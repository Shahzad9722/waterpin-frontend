import { take, call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { appActions as actions } from '.';
import { request } from 'utils/request';
import { selectPayload, selectError } from './selectors';
import { AppErrorType } from './types';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
var os = require('os');
const host = window.location.protocol+"//"+process.env.REACT_APP_API_ROOT

export function* submitSignup(action) {
  yield delay(100);
  const requestURL = host + `/auth/register/`;
  try {
    // Call our request helper (see 'utils/request')
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
    if (response) {
      yield put(actions.signupSuccess(response));
    } else {
      yield put(actions.signupError(AppErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.signupError(AppErrorType.RESPONSE_ERROR));
    } else if (err.response?.status === 400) {
      let resp = null;
      resp = yield err.response.json();
      yield put(actions.signupError(resp));
    } else if (err.message === 'A user with that username already exists.') {
      yield put(actions.signupError(AppErrorType.USER_ERROR));
    } else {
      yield put(actions.signupError(AppErrorType.RESPONSE_ERROR));
    }
  }
}
export function* signupSuccessSaga(payload) {
  yield delay(100);
  // Select username from store
  // const payloadToken = yield select(selectPayload);
  // setTimeout(() => {
  //     useToast(
  //         {
  //           title: "Signup Completed",
  //           description: "We've created your account for you...",
  //           status: "success",
  //           position:"top-right",
  //           duration: 9000,
  //           isClosable: true,
  //         },
  //     );
  // }, 100);
  yield put(
    actions.notify({
      msg: 'Signup successful! Please login using your new credentials...',
      severity: 'success',
    }),
  );
}

export function* signupErrorSaga(payload) {
  yield delay(100);
  const error = yield select(selectError);
  // setTimeout(() => {
  //     useToast(
  //         {
  //           title: "Signup Failed",
  //           description: "We ran into an issue creating your account. Please try again later...",
  //           status: "error",
  //           position:"top-right",
  //           duration: 9000,
  //           isClosable: true,
  //         },
  //     );
  // }, 100);
  yield put(
    actions.notify({
      msg: 'Signup was unsucessful! Please try again or contact support for assistance.',
      severity: 'error',
    }),
  );
}

export function* submitLogin(action) {
  // yield takeLatest(actions.someAction.type, doSomething);
  yield delay(1000);
  const requestURL = host + `/auth/login/`;

  try {
    // Call our request helper (see 'utils/request')
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

    if (response) {
      yield put(actions.loginSuccess(response));
    } else {
      yield put(actions.loginError(AppErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.loginError(AppErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.loginError(AppErrorType.RESPONSE_ERROR));
    } else if (err.response?.status === 400) {
      let resp = null;
      resp = yield err.response.json();
      yield put(actions.loginError(resp));
    } else {
      yield put(actions.loginError(AppErrorType.RESPONSE_ERROR));
    }
  }
}

export function* loginSuccessSaga(payload) {
  yield delay(100);
  const payloadToken = yield select(selectPayload);
  if (payloadToken.user.twoStepAuth) {
    yield localStorage.setItem('tempToken', payloadToken.token);
    yield localStorage.setItem('tempUser', JSON.stringify(payloadToken.user));
    let decoded: any = jwt_decode(payloadToken.token);
    yield localStorage.setItem('tempexpires_at', decoded.exp);
    yield localStorage.setItem('temporig_iat', decoded.orig_iat);
  } else {
    yield localStorage.setItem('token', payloadToken.token);
    yield localStorage.setItem('user', JSON.stringify(payloadToken.user));
    let decoded: any = jwt_decode(payloadToken.token);
    yield localStorage.setItem('expires_at', decoded.exp);
    yield localStorage.setItem('orig_iat', decoded.orig_iat);
  }
  yield put(
    actions.notify({
      msg: payloadToken.msg,
      severity: 'success',
    }),
  );
}

export function* verifyVerificationSaga(action) {
  yield delay(100);
  const requestURL = host + `/auth/login/two-step-auth/verify`;
  try {
    // Call our request helper (see 'utils/request')
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
    if (response) {
      let dm: any = localStorage.getItem('tempToken');
      console.log('dm', dm);
      yield localStorage.setItem('token', dm);
      let decoded: any = jwt_decode(dm);
      yield localStorage.setItem('expires_at', decoded.exp);
      yield localStorage.setItem('orig_iat', decoded.orig_iat);
      yield put(actions.verifyVerificationSuccess(response));
      yield localStorage.removeItem('tempUser');
      yield localStorage.removeItem('tempToken');
      yield localStorage.removeItem('tempexpires_at');
      yield localStorage.removeItem('temporig_iat');
      yield put(
        actions.notify({
          msg: 'Login successful! Redirecting you to dashboard...',
          severity: 'success',
        }),
      );
    } else {
      yield put(
        actions.notify({
          msg: 'Invalid Authentication Code..',
          severity: 'error',
        }),
      );
    }
  } catch (err: any) {
    console.log('errrrr', err);
    yield put(
      actions.notify({
        msg: 'Invalid Authentication Code..',
        severity: 'error',
      }),
    );
  }
}

export function* loginFailedSaga(payload) {
  yield delay(100);
  yield put(
    actions.notify({
      msg: 'Login was unsucessful! Please try again or contact support for assistance.',
      severity: 'error',
    }),
  );
}

export function* getUserSaga() {
  yield delay(100);
  const token = yield localStorage.getItem('token');
  const user = yield localStorage.getItem('user');
  var payload = { token: token, user: user };
}

export function* logoutSaga() {
  yield delay(100);
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('user');
  yield localStorage.removeItem('expires_at');
  yield localStorage.removeItem('orig_iat');
  yield window.location.reload();
  yield put(actions.logoutSuccess());
}

export function* forgotPWSaga(action) {
  yield delay(100);
  const requestURL = host + `/auth/password/reset/`;

  try {
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

    if (response) {
      yield put(actions.forgotPasswordLoaded(response));
    } else {
      yield put(actions.forgotPasswordError(AppErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.forgotPasswordError(AppErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.forgotPasswordError(AppErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.forgotPasswordError(AppErrorType.RESPONSE_ERROR));
    }
  }
}

export function* forgotPWSuccessSaga(payload) {
  yield delay(100);
  // setTimeout(() => {
  //     toast(
  //         {
  //             title: 'Success!',
  //             icon: 'check',
  //             description: "Your reset password request has been succesfully submitted. You should be recieving an reset email, shortly.",
  //             time: 10000,
  //         },
  //     );
  // }, 100);
}

export function* forgotPWFailureSaga(payload) {
  yield delay(100);
  // setTimeout(() => {
  //     toast(
  //         {
  //             title: 'Error!',
  //             icon: 'close',
  //             description: "Your reset password request could not be completed. Please try again later...",
  //             time: 10000,
  //         },
  //     );
  // }, 100);
}

export function* changePWSaga(action) {
  yield delay(100);
  const requestURL =
    host +
    `/auth/password/reset/confirm/` +
    JSON.stringify(action.payload.uid) +
    '/' +
    JSON.stringify(action.payload.token);
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
    if (response) {
      yield put(actions.changePasswordSuccess(response));
    } else {
      yield put(actions.changePasswordError(AppErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.changePasswordError(AppErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.changePasswordError(AppErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.changePasswordError(AppErrorType.RESPONSE_ERROR));
    }
  }
}

export function* changePWSuccessSaga(payload) {
  yield delay(100);
  // setTimeout(() => {
  //     toast(
  //         {
  //             title: 'Success!',
  //             icon: 'check',
  //             description: "Your password was succesfully changed. You may log in now...",
  //             time: 10000,
  //         },
  //     );
  // }, 100);
}

export function* changePasswordErrorSaga(payload) {
  yield delay(100);
  // setTimeout(() => {
  //     toast(
  //         {
  //             title: 'Error!',
  //             icon: 'close',
  //             description: "Your password could not be changed. Please try again later...",
  //             time: 10000,
  //         },
  //     );
  // }, 100);
}

export function* confirmEmailSaga(action) {
  yield delay(100);
  const requestURL = host + `/auth/register/verify-email/`;

  try {
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

    //console.log(response)
    if (response) {
      yield put(actions.confirmEmailSuccess(response));
    } else {
      yield put(actions.confirmEmailError(AppErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.confirmEmailError(AppErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.confirmEmailError(AppErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.confirmEmailError(AppErrorType.RESPONSE_ERROR));
    }
  }
}

export function* confirmEmailSuccessSaga(payload) {
  yield delay(100);
  //
  // setTimeout(() => {
  //     toast(
  //         {
  //             title: 'Success!',
  //             icon: 'check',
  //             description: "Your email has been verified. You may log in now. Redirecting you...",
  //             time: 10000,
  //         },
  //     );
  // }, 100);
  //
  // setTimeout(() => {
  //   window.open("/login", "_self")
  // }, 2000);
}

export function* confirmEmailFailureSaga(payload) {
  yield delay(100);

  // setTimeout(() => {
  //     toast(
  //         {
  //             title: 'Error!',
  //             icon: 'close',
  //             description: "Your email could not be verified. Please try again later...",
  //             time: 10000,
  //         },
  //     );
  // }, 100);
}

export function* getNotifications() {
  yield delay(500);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  const requestURL = host + `/user/notifications/`;
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
      yield put(actions.notificationsLoaded(response));
    } else {
      yield put(actions.notificationsError(AppErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.notificationsError(AppErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.notificationsError(AppErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.notificationsError(AppErrorType.RESPONSE_ERROR));
    }
  }
}

export function* clearNotificationsSaga(action) {
  // yield takeLatest(actions.someAction.type, doSomething);
  yield delay(500);
  // Select username from store
  // const username: string = yield select(selectUsername);
  // if (username.length === 0) {
  //   yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
  //   return;
  // }
  const requestURL = host + `/user/profile/notifications/clear`;

  try {
    // Call our request helper (see 'utils/request')
    //const repos: Repo[] = yield call(request, requestURL);
    var options = {
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
      yield put(actions.clearNotificationsLoaded(response));
    } else {
      yield put(actions.clearNotificationsError(AppErrorType.RESPONSE_ERROR));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.clearNotificationsError(AppErrorType.RESPONSE_ERROR));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.clearNotificationsError(AppErrorType.RESPONSE_ERROR));
    } else {
      yield put(actions.clearNotificationsError(AppErrorType.RESPONSE_ERROR));
    }
  }
}

export function* appSaga() {
  // yield takeLatest(actions.someAction.type, doSomething);
  yield takeLatest(actions.signup.type, submitSignup);
  yield takeLatest(actions.signupSuccess.type, signupSuccessSaga);
  yield takeLatest(actions.signupError.type, signupErrorSaga);
  yield takeLatest(actions.login.type, submitLogin);
  yield takeLatest(actions.loginSuccess.type, loginSuccessSaga);
  yield takeLatest(actions.verifyVerification.type, verifyVerificationSaga);
  yield takeLatest(actions.loginError.type, loginFailedSaga);

  yield takeLatest(actions.logout.type, logoutSaga);
  yield takeLatest(actions.forgotPassword.type, forgotPWSaga);
  yield takeLatest(actions.forgotPasswordLoaded.type, forgotPWSuccessSaga);
  yield takeLatest(actions.forgotPasswordError.type, forgotPWFailureSaga);
  yield takeLatest(actions.changePassword.type, changePWSaga);
  yield takeLatest(actions.changePasswordSuccess.type, changePWSuccessSaga);
  yield takeLatest(actions.changePasswordError.type, changePasswordErrorSaga);
  yield takeLatest(actions.confirmEmail.type, confirmEmailSaga);
  yield takeLatest(actions.confirmEmailSuccess.type, confirmEmailSuccessSaga);
  yield takeLatest(actions.confirmEmailError.type, confirmEmailFailureSaga);
  yield takeLatest(actions.loadNotifications.type, getNotifications);
  yield takeLatest(actions.clearNotifications.type, clearNotificationsSaga);
}
