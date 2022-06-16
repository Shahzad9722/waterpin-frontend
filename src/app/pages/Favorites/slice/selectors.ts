import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.favorites || initialState;

export const selectFavorites = createSelector([selectSlice], state => state);

export const selectLoading = createSelector(
  [selectSlice],
  favoriteState => favoriteState.loading,
);

export const selectError = createSelector(
  [selectSlice],
  favoriteState => favoriteState.error,
);

export const selectPayload = createSelector(
  [selectSlice],
  favoriteState => favoriteState.payload,
);


export const selectResults = createSelector(
  [selectSlice],
  favoriteState => favoriteState.results,
);

export const selectSuccess = createSelector(
  [selectSlice],
  favoriteState => favoriteState.success,
);

export const selectPageNum = createSelector(
  [selectSlice],
  favoriteState => favoriteState.page_num,
);

export const selectNumOfPages = createSelector(
  [selectSlice],
  favoriteState => favoriteState.num_of_pages,
);

export const selectFavoritesCollection = createSelector(
  [selectSlice],
  favoriteState => favoriteState.favorites,
);
