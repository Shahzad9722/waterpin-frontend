/* --- STATE --- */
export interface DashboardState {
  loading: boolean;
  success: boolean;
  error?: DashboardErrorType | null;
  payload?: any | null;
  user?: any | null;
  recent_messages: any[] | null;
  favorites?: any[] | null;
  fleet_list?: any[] | null;
  dashboard_data?: any | null;
}

export enum DashboardErrorType {
  RESPONSE_ERROR = 1,
}
