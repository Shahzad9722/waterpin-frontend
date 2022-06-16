import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.account || initialState;

export const selectAccount = createSelector([selectSlice], state => state);

export const selectLoading = createSelector(
  [selectSlice],
  accountState => accountState.loading,
);

export const selectError = createSelector(
  [selectSlice],
  accountState => accountState.error,
);

export const selectPayload = createSelector(
  [selectSlice],
  accountState => accountState.payload,
);

export const selectSuccess = createSelector(
  [selectSlice],
  accountState => accountState.success,
);

export const selectUser = createSelector(
  [selectSlice],
  accountState => accountState.user,
);

export const selectPMSetupData = createSelector(
  [selectSlice],
  accountState => accountState.pmSetupData,
);

export const selectNotificationSettings = createSelector(
  [selectSlice],
  accountState => accountState.notifSettings,
);

export const selectInviteSuccess = createSelector(
  [selectSlice],
  accountState => accountState.invite_success,
);
