import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { favoritesSaga } from './saga';
import { FavoritesState } from './types';

export const initialState: FavoritesState = {
  loading: false,
  success: false,
  favoriteSuccess: false,
  error: null,
  results: null,
  page_num:1,
  num_of_pages:0,
  payload: null,
  favorites: [],
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {

    getUserFavorites(state) {
      state.loading = true;
      state.error = null;
    },
    getUserFavoritesSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
      state.favorites = data;
    },
    getUserFavoritesError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

    favoriteListing(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.error = null;
      state.favoriteSuccess = false;
    },
    favoriteListingSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
      state.favoriteSuccess = true;
    },
    favoriteListingError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

    unfavoriteListing(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.error = null;
      //state.favoriteSuccess = false;
    },
    unfavoriteListingSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
      //state.favoriteSuccess = true;
    },
    unfavoriteListingError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: favoritesActions } = slice;

export const useFavoritesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: favoritesSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useFavoritesSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
