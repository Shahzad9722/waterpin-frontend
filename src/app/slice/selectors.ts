import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.app || initialState;

export const selectApp = createSelector([selectSlice], state => state);

export const selectLoading = createSelector(
  [selectSlice],
  appState => appState.loading,
);

export const selectError = createSelector(
  [selectSlice],
  appState => appState.error,
);

export const selectPayload = createSelector(
  [selectSlice],
  appState => appState.payload,
);

export const selectToken = createSelector(
  [selectSlice],
  appState => appState.token,
);

export const selectSuccess = createSelector(
  [selectSlice],
  appState => appState.success,
);

export const selectLoginSuccess = createSelector(
  [selectSlice],
  appState => appState.login_success,
);

export const selectLoginSuccessAfterVerify = createSelector(
  [selectSlice],
  appState => appState.login_success_after_verify,
);

export const selectSignupSuccess = createSelector(
  [selectSlice],
  appState => appState.signup_success,
);

export const selectNotifications = createSelector(
  [selectSlice],
  appState => appState.notifications,
);

export const selectUser = createSelector(
  [selectSlice],
  appState => appState.user,
);

export const selectSignupModalOpen = createSelector(
  [selectSlice],
  appState => appState.signupModalOpen,
);

export const selectLoginModalOpen = createSelector(
  [selectSlice],
  appState => appState.loginModalOpen,
);

export const selectNotificationsModalOpen = createSelector(
  [selectSlice],
  appState => appState.notificationsModalOpen,
);

export const selectAppAlert = createSelector(
  [selectSlice],
  appState => appState.appAlert,
);

export const selectAppAlertOpen = createSelector(
  [selectSlice],
  appState => appState.appAlertOpen,
);

export const selectAppAlertSeverity = createSelector(
  [selectSlice],
  appState => appState.appAlertSeverity,
);

export const selectActiveViewMode = createSelector(
  [selectSlice],
  appState => appState.view_mode,
);
