/* --- STATE --- */
export interface DestinationsState {
  loading: boolean;
  success: boolean;
  error?: DestinationErrorType | null;
  total: number;
  num_of_pages: number;
  location_data: any | null;
  // payload?: any | null;
  destinations: any[] | null;
  city_province: string;
  page: number;
}

export enum DestinationErrorType {
  RESPONSE_ERROR = 1,
}
