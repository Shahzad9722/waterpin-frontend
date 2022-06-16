import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { appSaga } from './saga';
import { AppState } from './types';
import jwt_decode from 'jwt-decode';

export const initialState: AppState = {
  loading: false,
  error: null,
  payload: null,
  user: null,
  token: null,
  success: false,
  signup_success: false,
  login_success: false,
  notifications: [],
  signupModalOpen: false,
  loginModalOpen: false,
  notificationsModalOpen: false,
  appAlert: 'Hello',
  appAlertSeverity: 'success',
  appAlertOpen: false,
  view_mode: '',
  login_success_after_verify: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    signup(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.error = null;
      state.payload = data;
      state.token = null;
    },
    signupSuccess(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
      state.token = data.token;
      state.signup_success = true;
    },
    signupError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    login(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.error = null;
      state.payload = data;
      state.token = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
      state.token = data.token;
      state.user = data.user;
      if (data.user.twoStepAuth) state.login_success = false;
      else state.login_success = true;
    },
    verifyVerification(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.payload = data;
    },
    verifyVerificationSuccess(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = false;
      state.payload = data;
      state.login_success = true;
      state.login_success_after_verify = true;
      let temp1: any = localStorage.getItem('token');
      state.token = temp1;
      state.user = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', temp1);
    },
    loginError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    confirmEmail(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.error = null;
      state.payload = data;
    },
    confirmEmailSuccess(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
    },
    confirmEmailError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    forgotPassword(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.error = null;
      state.payload = data;
      state.token = null;
    },
    forgotPasswordLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
      state.token = data.token;
    },
    forgotPasswordError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    changePassword(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.error = null;
      state.payload = data;
    },
    changePasswordSuccess(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
      state.success = true;
    },
    changePasswordError(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.error = null;
      state.payload = data;
    },
    logout(state) {
      state.loading = true;
      state.error = null;
      state.token = null;
    },
    logoutSuccess(state) {
      state.loading = false;
    },
    logoutError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    loadNotifications(state) {
      state.loading = true;
      state.error = null;
      state.notifications = [];
    },
    notificationsLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.notifications = data;
      state.loading = false;
    },
    notificationsError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearNotifications(state) {
      state.loading = true;
      state.error = null;
    },
    clearNotificationsLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.notifications = data;
      state.loading = false;
    },
    clearNotificationsError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    toggleSignupModal(state) {
      state.signupModalOpen = !state.signupModalOpen;
    },
    toggleLoginModal(state) {
      state.loginModalOpen = !state.loginModalOpen;
    },
    toggleNotificationsModal(state) {
      state.notificationsModalOpen = !state.notificationsModalOpen;
    },
    notify(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.appAlertSeverity = data.severity;
      state.appAlert = data.msg;
      state.appAlertOpen = true;
      state.loading = false;
    },
    closeNotify(state) {
      state.appAlertOpen = false;
    },
    set_authUser(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.user = data;
    },
    set_authToken(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.token = data;
    },
    switchToOwnerView(state) {
      localStorage.setItem('viewmode', 'owner');
      //state.view_mode = 'owner'
    },
    switchToRenterView(state) {
      localStorage.setItem('viewmode', 'renter');
      //state.view_mode = 'renter'
    },
    set_view_mode(state, action: PayloadAction<any>) {
      const data = action.payload;
      localStorage.setItem('viewmode', data.view);
      state.view_mode = data.view;
    },
  },
});

export const { actions: appActions } = slice;

export const useAppSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: appSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAppSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
