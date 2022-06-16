/* --- STATE --- */
export interface TripsState {
  loading: boolean;
  success: boolean;
  error?: TripsErrorType | null;
  payload: any | null;
  trips: any[] | null;
  bookings: any[] | null;
}
export enum TripsErrorType {
  RESPONSE_ERROR = 1,
}
