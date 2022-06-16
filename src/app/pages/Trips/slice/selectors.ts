import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.trips || initialState;

export const selectTrips = createSelector([selectSlice], state => state);

export const selectAllTrips = createSelector(
  [selectSlice],
  tripState => tripState.trips,
);

export const selectLoading = createSelector(
  [selectSlice],
  tripState => tripState.loading,
);

export const selectAllBookings = createSelector(
  [selectSlice],
  tripState => tripState.bookings,
);
