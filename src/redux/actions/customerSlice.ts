import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ICustomer from "../../models/Customer";

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
  status: "",
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

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
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
      });
  },
});

export default customerSlice.reducer;
