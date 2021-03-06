import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ICustomer, { defaultCustomer } from "../../models/Customer";
import IUser from "../../models/User";
import { IStoreState } from "../Store";

export interface ICustomerState {
  customer: ICustomer;
  status: string;
  error: string | null;
}

const initialState: ICustomerState = {
  customer: {
    customerUniqueID: 0,
    user: {
      userID: null,
      password: null,
      userRole: {
        roleID: 2,
        roleName: "USER",
      },
      verified: false,
    },
    name: "",
    postal: 0,
    dob: "",
    email: "",
  },
  status: "idle",
  error: null,
};

export const lookupCustomer = createAsyncThunk(
  "customer/lookup",
  async (pid: number) => {
    return axios
      .get("http://localhost:5000/customer/personal/" + pid)
      .then((resp) => resp.data);
  }
);

export const saveCustomer = createAsyncThunk<
  ICustomer,
  ICustomer,
  { state: IStoreState }
>("customer/add", async (customer: ICustomer, thunkAPI) => {
  return axios
    .post("http://localhost:5000/customer/add", customer)
    .then((resp) => resp.data);
});

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    clearCustomer: (state, action) => {
      state.customer = defaultCustomer;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(lookupCustomer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(lookupCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customer = action.payload;
      })
      .addCase(lookupCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(saveCustomer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(saveCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customer = action.payload;
      })
      .addCase(saveCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { clearCustomer } = customerSlice.actions;

export default customerSlice.reducer;
