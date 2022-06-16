/* --- STATE --- */
export interface AccountState {
  loading: boolean;
  success: boolean;
  error?: AccountErrorType | null;
  payload?: any | null;
  user?: any | null;
  invites: any[] | null;
  paymentsData?: any | null;
  pmSetupData?: any | null;
  securityData?: any | null;
  rewardsData?: any | null;
  notifSettings?: any | null;
  toggle_success: boolean;
  invite_success: boolean;
}

export enum AccountErrorType {
  RESPONSE_ERROR = 1,
}
