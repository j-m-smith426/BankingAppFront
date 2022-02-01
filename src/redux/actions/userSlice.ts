import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IUser, { emptyUser } from "../../models/User";

export interface IState {
  user: IUser;
  status: string;
  error: string | null;
}

const initialState: IState = {
  user: {
    userID: 0,
    userRole: {
      roleID: 1,
      roleName: "USER",
    },
    password: "",
    verified: false,
  },
  status: "idle",
  error: null,
};
export interface ICredentials {
  username: Number;
  password: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (credentials: ICredentials, thunkAPI) => {
    return axios
      .post("http://localhost:5000/login", {
        ...credentials,
      })
      .then((response) => response.data);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state, action) => {
      state.user = emptyUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
