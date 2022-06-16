/* --- STATE --- */
export interface FavoritesState {
  favoriteSuccess:boolean;
  loading: boolean;
  success: boolean;
  page_num:number;
  num_of_pages: number;
  error?: FavoritesErrorType | null;
  results: any | null;
  payload: any | null;
  favorites:any[];
}

export enum FavoritesErrorType {
  RESPONSE_ERROR = 1,
}
