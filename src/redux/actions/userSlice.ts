import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IUser, { emptyUser } from "../../models/User";
import { IStoreState } from "../Store";

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

export interface IVerifyPassword {
  currentPassword: string;
  newPassword: string;
}

export const login = createAsyncThunk<IUser, ICredentials, {}>(
  "user/login",
  async (credentials: ICredentials, thunkAPI) => {
    return axios
      .post("http://localhost:5000/login", {
        ...credentials,
      })
      .then((response) => response.data);
  }
);

export const verifyPassword = createAsyncThunk<
  IUser,
  IVerifyPassword,
  { state: IStoreState }
>("user/verify", async (passwords: IVerifyPassword, thunkAPI) => {
  const user = thunkAPI.getState().user.user;
  return axios
    .post("http://localhost:5000/update", {
      user,
      updatedPassword: passwords.newPassword,
    })
    .then((resp) => resp.data);
});

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
      })
      .addCase(verifyPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(verifyPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(verifyPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
