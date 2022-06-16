import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.dashboard || initialState;

export const selectDashboard = createSelector([selectSlice], state => state);

export const selectLoading = createSelector(
  [selectSlice],
  dashboardState => dashboardState.loading,
);

export const selectError = createSelector(
  [selectSlice],
  dashboardState => dashboardState.error,
);

export const selectPayload = createSelector(
  [selectSlice],
  dashboardState => dashboardState.payload,
);

export const selectSuccess = createSelector(
  [selectSlice],
  dashboardState => dashboardState.success,
);

export const selectUser = createSelector(
  [selectSlice],
  dashboardState => dashboardState.user,
);

export const selectFleetList = createSelector(
  [selectSlice],
  dashboardState => dashboardState.fleet_list,
);
