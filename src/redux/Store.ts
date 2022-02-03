import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountSlice, { IAccountState } from "./actions/accountSlice";
import customerSlice, { ICustomerState } from "./actions/customerSlice";
import redirectReducer, { IRedirectState } from "./actions/redirectReducer";
import transactionSlice, { ITransactonState } from "./actions/transactionSlice";
import userSlice, { IState } from "./actions/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    redirect: redirectReducer,
    customer: customerSlice,
    account: accountSlice,
    transaction: transactionSlice,
  },
});
export default store;
export interface IStoreState {
  user: IState;
  redirect: IRedirectState;
  customer: ICustomerState;
  account: IAccountState;
  transaction: ITransactonState;
}

export type AppDispatch = typeof store.dispatch;
