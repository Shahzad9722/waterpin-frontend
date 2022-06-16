/* --- STATE --- */
export interface ProfileState {
  loading: boolean;
  success: boolean;
  error?: ProfilePageErrorType | null;
  payload?: any | null;
  user?: any | null;
  reviews?: any[] | null;
  activeProfileDetail:any | null;
}

export enum ProfilePageErrorType {
  RESPONSE_ERROR = 1,
}
