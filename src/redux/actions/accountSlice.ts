import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import IAccount, { defaultAccount } from "../../models/Account";
import ITransaction from "../../models/Transaction";
import { IStoreState } from "../Store";
import { SaveTransaction } from "./transactionSlice";

export interface IAccountState {
  accounts: IAccount[];
  account: IAccount;
  selected: number | null;
  status: string;
  error: string | null;
}

const initialState: IAccountState = {
  accounts: [],
  account: defaultAccount,
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

export const saveAccount = createAsyncThunk<
  IAccount,
  IAccount,
  AsyncThunkConfig
>("account/add", async (account: IAccount, thunkApi) => {
  let savedAccount: IAccount = defaultAccount;
  await axios
    .post("http://localhost:5000/account/add", account)
    .then((resp) => resp.data)
    .then((data) => {
      savedAccount = data;

      if (savedAccount.accountID !== null) {
        const createdTransaction: ITransaction = {
          transactionID: null,
          referenceName: "Initial Deposit",
          transaction_date: new Date().toISOString().substring(0, 10),
          transaction_type: "Debit",
          transaction_subtype: "Cash",
          currentBalance: savedAccount.currentBalance,
          associatedAccount: {
            accountID: savedAccount.accountID,
          },
        };
        console.log(createdTransaction);
        thunkApi
          .dispatch(SaveTransaction(createdTransaction))
          .then(() => thunkApi.dispatch(retrieveAccounts));
      }
    });
  return savedAccount;
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
      })
      .addCase(saveAccount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(saveAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.account = action.payload;
      })
      .addCase(saveAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { setSelected, clearSelected } = accountSlice.actions;

export default accountSlice.reducer;
