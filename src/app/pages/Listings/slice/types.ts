/* --- STATE --- */
export interface ListingState {
  list_type:string;
  filter_size_max:number;
  filter_size_min:number;
  filter_price_min:number;
  filter_price_max:number;
  filter_water_toys: any | null;
  filter_more_filter: any | null;
  location:string;
  duration:string;
  start_charter:string;
  end_charter:string;
  autocompleteLoading:boolean;
  bookingSuccess:boolean;
  loading: boolean;
  success: boolean;
  page_num:number;
  total:number;
  num_of_pages: number;
  error?: ListingErrorType | null;
  results: any | null;
  payload: any | null;
  userListings:any[];
  autoCompleteResults:any[];
  activeListingDetail: any | null;
  activeListingPricing: any | null;
  mapData: any | null;
  pmSecret:any | null;
}

export enum ListingErrorType {
  RESPONSE_ERROR = 1,
}
