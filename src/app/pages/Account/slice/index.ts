import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { accountSaga } from './saga';
import { AccountState } from './types';

export const initialState: AccountState = {
  invites: [],
  paymentsData: null,
  pmSetupData: null,
  securityData: null,
  rewardsData: null,
  loading: false,
  error: null,
  payload: null,
  user: null,
  success: false,
  notifSettings: null,
  toggle_success: false,
  invite_success: false,
};

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loadAccount(state) {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    accountLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.user = data;
      state.notifSettings = data.notification_preference;
      state.loading = false;
    },
    accountLoadedError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateAccount(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.user = null;
      state.loading = true;
    },
    updateAccountLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.user = data;
      state.loading = false;
    },
    updateAccountError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateNotificationSettings(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.notifSettings[data.name] = data.value;
      state.loading = true;
    },
    updateNotificationSettingsLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.notifSettings = data;
      state.loading = false;
    },
    updateNotificationSettingsError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

    loadPaymentSetupIntent(state) {
      state.loading = true;
      state.payload = null;
    },
    loadPaymentSetupIntentLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.pmSetupData = data;
      state.loading = false;
    },
    loadPaymentSetupIntentError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },

    addPaymentMethod(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = true;
    },
    addPaymentMethodLoaded(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      let newUser = { ...state.user };
      newUser = data.user;
      console.log(newUser);
      state.user = newUser;
      state.loading = false;
      state.success = true;
    },
    addPaymentMethodError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    toggleTwoStep(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = true;
      state.toggle_success = false;
    },
    successToggleTwoStep(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
      state.toggle_success = true;
    },
    toggleTwoStepError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    inviteFriend(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = true;
      state.invite_success = false;
    },
    inviteFriendSuccess(state, action: PayloadAction<any>) {
      const data = action.payload;
      state.payload = data;
      state.loading = false;
      state.invite_success = true;
    },
    inviteFriendError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    resetInviteModal(state) {
      state.invite_success = false;
    },
  },
});

export const { actions: accountActions } = slice;

export const useAccountSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: accountSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAccountSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
