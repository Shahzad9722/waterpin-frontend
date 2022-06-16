import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.booking || initialState;

export const selectBooking = createSelector([selectSlice], state => state);
