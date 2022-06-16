import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { dashboardSaga } from './saga';
import { DashboardState } from './types';

export const initialState: DashboardState = {
  dashboard_data: null,
  recent_messages: [],
  favorites:[],
  loading: false,
  error: null,
  payload:null,
  user:null,
  success: false,
  fleet_list: [],
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getDashboardData(state) {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    dashboardLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.user = data.user;
      state.dashboard_data = data.dashboard;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(data.user))

    },
    dashboardLoadedError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    loadFleetList(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = true;
      state.error = null;
      state.fleet_list = [];
    },
    loadFleetListLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.fleet_list = data;
      state.loading = false;
    },
    loadFleetListError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

  },
});

export const { actions: dashboardActions } = slice;

export const useDashboardSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: dashboardSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useDashboardSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
