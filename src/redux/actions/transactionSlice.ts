import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ITransaction, { defaultTransaction } from "../../models/Transaction";
import { IStoreState } from "../Store";

export interface ITransactonState {
  transactions: ITransaction[];
  savedTransactions: ITransaction;
  status: string;
  error: string | null;
}

const initialState: ITransactonState = {
  transactions: [],
  status: "idle",
  error: null,
  savedTransactions: defaultTransaction,
};

export const TransactionsByAccount = createAsyncThunk<
  ITransaction[],
  void,
  { state: IStoreState }
>("transaction/all", async (_, thunkApi) => {
  const store = thunkApi.getState();
  const selected = store.account.selected;
  if (selected != null) {
    const accountId = store.account.accounts[selected].accountID;
    return axios
      .get("http://localhost:5000/transaction/account/" + accountId)
      .then((resp) => resp.data);
  } else {
    return [];
  }
});

export const SaveTransaction = createAsyncThunk<
  ITransaction,
  ITransaction,
  { state: IStoreState }
>("transaction/save", async (transaction: ITransaction, thunkApi) => {
  const response: ITransaction = await axios
    .post("http://localhost:5000/transaction/", transaction)
    .then((resp) => resp.data);
  if (response.transactionID !== null) {
    thunkApi.dispatch(TransactionsByAccount());
  }
  return response;
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TransactionsByAccount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(TransactionsByAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(TransactionsByAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(SaveTransaction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(SaveTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.savedTransactions = action.payload;
      })
      .addCase(SaveTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default transactionSlice.reducer;
