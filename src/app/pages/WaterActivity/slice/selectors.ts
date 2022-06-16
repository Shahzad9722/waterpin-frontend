import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.wateractivities || initialState;

export const selectWateractivities = createSelector(
  [selectSlice],
  state => state,
);
