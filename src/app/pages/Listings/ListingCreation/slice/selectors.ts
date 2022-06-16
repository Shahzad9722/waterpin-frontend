import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.listcreation || initialState;

export const selectListcreation = createSelector([selectSlice], state => state);

export const selectLoading = createSelector(
  [selectSlice],
  listCreateState => listCreateState.loading,
);

export const selectError = createSelector(
  [selectSlice],
  listCreateState => listCreateState.error,
);

export const selectPayload = createSelector(
  [selectSlice],
  listCreateState => listCreateState.payload,
);

export const selectSuccess = createSelector(
  [selectSlice],
  listCreateState => listCreateState.success,
);
