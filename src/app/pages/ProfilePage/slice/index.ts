import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { profileSaga } from './saga';
import { ProfileState } from './types';

export const initialState: ProfileState = {
  loading: false,
  error: null,
  payload:null,
  user:null,
  activeProfileDetail:null,
  success: false,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile(state) {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    profileLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.user = data.user;
      state.loading = false;
      //localStorage.setItem('user', JSON.stringify(data.user))
    },
    profileLoadedError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

    getProfileByUserId(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = true;
      state.error = null;
      state.activeProfileDetail = null;
    },
    getProfileByUserIdLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.activeProfileDetail = data.user;
      state.loading = false;
      //localStorage.setItem('user', JSON.stringify(data.user))
    },
    getProfileByUserIdError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: profileActions } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: profileSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useProfileSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
