import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.profile || initialState;

export const selectProfile = createSelector([selectSlice], state => state);

export const selectLoading = createSelector(
  [selectSlice],
  profileState => profileState.loading,
);

export const selectError = createSelector(
  [selectSlice],
  profileState => profileState.error,
);

export const selectPayload = createSelector(
  [selectSlice],
  profileState => profileState.payload,
);

export const selectSuccess = createSelector(
  [selectSlice],
  profileState => profileState.success,
);

export const selectUser = createSelector(
  [selectSlice],
  profileState => profileState.user,
);
