import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.listing || initialState;

export const selectListing = createSelector([selectSlice], state => state);

export const selectLoading = createSelector(
  [selectSlice],
  listingState => listingState.loading,
);

export const selectError = createSelector(
  [selectSlice],
  listingState => listingState.error,
);

export const selectPayload = createSelector(
  [selectSlice],
  listingState => listingState.payload,
);


export const selectResults = createSelector(
  [selectSlice],
  listingState => listingState.results,
);

export const selectSuccess = createSelector(
  [selectSlice],
  listingState => listingState.success,
);

export const selectPageNum = createSelector(
  [selectSlice],
  listingState => listingState.page_num,
);

export const selectNumOfPages = createSelector(
  [selectSlice],
  listingState => listingState.num_of_pages,
);

export const selectSearchTotal = createSelector(
  [selectSlice],
  listingState => listingState.total,
);

export const selectDuration = createSelector(
  [selectSlice],
  listingState => listingState.duration,
);

export const selectLocation = createSelector(
  [selectSlice],
  listingState => listingState.location,
);

export const selectStartCharter = createSelector(
  [selectSlice],
  listingState => listingState.start_charter,
);

export const selectEndCharter = createSelector(
  [selectSlice],
  listingState => listingState.end_charter,
);

export const selectFilterMinSize = createSelector(
  [selectSlice],
  listingState => listingState.filter_size_min,
);

export const selectFilterMaxSize = createSelector(
  [selectSlice],
  listingState => listingState.filter_size_max,
);


export const selectFilterPriceMin = createSelector(
  [selectSlice],
  listingState => listingState.filter_price_min,
);

export const selectFilterPriceMax = createSelector(
  [selectSlice],
  listingState => listingState.filter_price_max,
);

export const selectFilterWaterToys = createSelector(
  [selectSlice],
  listingState => listingState.filter_water_toys,
);

export const selectFilterMore = createSelector(
  [selectSlice],
  listingState => listingState.filter_more_filter,
);

export const selectUserListings = createSelector(
  [selectSlice],
  listingState => listingState.userListings,
);

export const selectActiveListingDetail = createSelector(
  [selectSlice],
  listingState => listingState.activeListingDetail,
);

export const selectAutoCompleteResults = createSelector(
  [selectSlice],
  listingState => listingState.autoCompleteResults,
);

export const selectMapData = createSelector(
  [selectSlice],
  listingState => listingState.mapData,
);

export const selectActiveListingPricing = createSelector(
  [selectSlice],
  listingState => listingState.activeListingPricing,
);

export const selectBookingSuccess = createSelector(
  [selectSlice],
  listingState => listingState.bookingSuccess,
);

export const selectPmSecret = createSelector(
  [selectSlice],
  listingState => listingState.pmSecret,
);

export const selectListType = createSelector(
  [selectSlice],
  listingState => listingState.list_type,
);
