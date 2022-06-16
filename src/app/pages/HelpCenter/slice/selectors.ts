import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.support || initialState;

export const selectSupport = createSelector([selectSlice], state => state);
