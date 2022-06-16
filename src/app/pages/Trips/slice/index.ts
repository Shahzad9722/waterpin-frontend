import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { tripsSaga } from './saga';
import { TripsState } from './types';

export const initialState: TripsState = {
  loading: false,
  success: false,
  error: null,
  payload: null,
  trips: null,
  bookings: null,
};

const slice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    getAllTrips(state) {
      state.loading = true;
      state.error = null;
      state.trips = null;
    },
    getAllTripsLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.trips = data;
      state.loading = false;
      //localStorage.setItem('user', JSON.stringify(data.user))
    },
    getAllTripsError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    getAllBookings(state) {
      state.loading = true;
      state.error = null;
      state.bookings = null;
    },
    getAllBookingsLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.bookings = data;
      state.loading = false;
      //localStorage.setItem('user', JSON.stringify(data.user))
    },
    getAllBookingsError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: tripsActions } = slice;

export const useTripsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: tripsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useTripsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
