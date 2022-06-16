import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.destinations || initialState;

export const selectDestinations = createSelector([selectSlice], state => state);
