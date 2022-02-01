import { combineReducers, configureStore } from "@reduxjs/toolkit";
import customerSlice, { ICustomerState } from "./actions/customerSlice";
import redirectReducer, { IRedirectState } from "./actions/reducer";
import userSlice, { IState } from "./actions/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    redirect: redirectReducer,
    customer: customerSlice,
  },
});
export default store;
export interface IStoreState {
  user: IState;
  redirect: IRedirectState;
  customer: ICustomerState;
}

export type AppDispatch = typeof store.dispatch;
