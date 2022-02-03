import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import IAccount from "../../models/Account";
import { IStoreState } from "../Store";

export interface IAccountState {
  accounts: IAccount[];
  selected: number | null;
  status: string;
  error: string | null;
}

const initialState: IAccountState = {
  accounts: [],
  selected: null,
  status: "",
  error: null,
};

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state: IStoreState;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};

export const retrieveAccounts = createAsyncThunk<
  IAccount[],
  void,
  AsyncThunkConfig
>("customer/accounts", async (_, thunkApi) => {
  const state: IStoreState = thunkApi.getState();
  const id = state.customer.customer.user.userID;
  const accounts: IAccount[] = await axios
    .get("http://localhost:5000/account/" + id)
    .then((resp) => resp.data);
  return accounts;
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    clearSelected: (state, action) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveAccounts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(retrieveAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accounts = action.payload;
      })
      .addCase(retrieveAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { setSelected, clearSelected } = accountSlice.actions;

export default accountSlice.reducer;
