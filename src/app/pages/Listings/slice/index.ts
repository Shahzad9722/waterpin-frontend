import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { listingSaga } from './saga';
import { ListingState } from './types';

export const initialState: ListingState = {
  loading: false,
  autocompleteLoading: false,
  success: false,
  bookingSuccess: false,
  error: null,
  results: null,
  location:'',
  duration:'',
  start_charter:'',
  end_charter:'',
  list_type:'',
  filter_size_min:0,
  filter_size_max:0,
  filter_price_min:0,
  filter_price_max:0,
  filter_water_toys:null,
  filter_more_filter:null,
  page_num:1,
  num_of_pages:0,
  total:0,
  payload: null,
  mapData: null,
  userListings: [],
  autoCompleteResults: [],
  activeListingDetail: null,
  activeListingPricing: null,
  pmSecret: null,
};

const slice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    search(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = true;
      state.location = data.location;
      state.duration = data.duration;
      state.start_charter = data.start_charter;
      state.end_charter = data.end_charter;
      state.filter_size_min = data.filter_size_min;
      state.filter_size_max = data.filter_size_max;
      state.filter_price_min = data.filter_price_min;
      state.filter_price_max = data.filter_price_max;
      state.filter_water_toys = data.filter_water_toys;
      state.filter_more_filter = data.filter_more_filter;
      state.list_type = data.list_type;
      state.page_num = data.page_num;
      state.results = null;

    },
    searchLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.results = data.results;
      state.num_of_pages = data.pages;
      state.total = data.total;
      state.loading = false;
      state.mapData = data.locationData
    },
    searchError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    setListingFilter(state, action: PayloadAction<any>) {
      const data = action.payload;
      state[data.name] = data.value;
    },

    autocompleteLocation(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.location = data.location;
    },
    setStart_charter(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.start_charter = data.startDate;
    },
    setEnd_charter(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.end_charter = data.endDate;
    },
    autocompleteLocationLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.autoCompleteResults = data;
      state.loading = false;
    },
    autocompleteLocationError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    getListingPricing(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.location = data.location;
      state.loading = true;
    },
    getListingPricingLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.activeListingPricing = data;
      state.loading = false;
    },
    getListingPricingError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    setPage(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.page_num = data.page_num
    },
    getAllUserListings(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.userListings = [];
    },
    getAllUserListingsSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.userListings = data
    },
    getAllUserListingsError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

    loadListingDetail(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.activeListingDetail = null;
      state.loading = false;
      state.error = null;
    },
    loadListingDetailSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.activeListingDetail = data;
      state.loading = false;
    },
    loadListingDetailError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

    bookListing(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = false;
      state.error = null;
    },
    bookListingSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
    },
    bookListingError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },


    createPaymentIntent(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = false;
      state.error = null;
    },
    createPaymentIntentSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.pmSecret = data;
      state.loading = false;
    },
    createPaymentIntentError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

    favoriteListing(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = false;
      state.error = null;
    },
    favoriteListingSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
    },
    favoriteListingError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

    unfavoriteListing(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.loading = false;
      state.error = null;
    },
    unavoriteListingSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
    },
    unfavoriteListingError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },



  },
});

export const { actions: listingActions } = slice;

export const useListingSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: listingSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useListingSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
