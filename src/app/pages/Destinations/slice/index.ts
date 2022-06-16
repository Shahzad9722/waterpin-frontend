import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { destinationsSaga } from './saga';
import { DestinationsState } from './types';

export const initialState: DestinationsState = {
  destinations: [],
  loading: false,
  error: null,
  success: false,
  total: 0,
  num_of_pages: 0,
  city_province: 'Alabama',
  page: 1,
  location_data: null,
};

const slice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    getDestinations(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.error = null;
      state.success = false;
      state.city_province = data.state;
      state.page = data.page_num;
    },
    destinationsLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      console.log('data', data);
      state.destinations = data.results;
      console.log('destinations', state.destinations);
      state.num_of_pages = data.pages;
      state.total = data.total;
      state.location_data = data.location_data;
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    destinationsError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions: destinationsActions } = slice;

export const useDestinationsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: destinationsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useDestinationsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
