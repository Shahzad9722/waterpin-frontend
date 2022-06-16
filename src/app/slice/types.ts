/* --- STATE --- */
export interface AppState {
  loading: boolean;
  success: boolean;
  login_success: boolean;
  error?: AppErrorType | null;
  payload?: any | null;
  user?: any | null;
  token?: string | null;
  notifications: any[] | null;
  signup_success: boolean;
  signupModalOpen: boolean;
  loginModalOpen: boolean;
  appAlert: string;
  appAlertOpen: boolean;
  appAlertSeverity: AlertColor;
  view_mode: string;
  notificationsModalOpen: boolean;
  login_success_after_verify: boolean;
}

export type AlertColor = 'success' | 'error' | 'warning' | 'info';

export enum AppErrorType {
  RESPONSE_ERROR = 1,
  SIGNUP_ERROR = 2,
  LOGIN_ERROR = 3,
  FOROGTPW_ERROR = 4,
  NOTIFICATIONS_ERROR = 5,
  USER_ERROR = 6,
}
