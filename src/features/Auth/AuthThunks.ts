import { createAsyncThunk } from "@reduxjs/toolkit";
import type { accessRefreshInterface, loginInterface, signupPostInterface, signupResponseInterface, userDataInterface } from "./AuthInterfaces";
import { loginRequest, signupRequest, userProfileRequest } from "./AuthRequests";
import axios from "axios";

export const loginThunk = createAsyncThunk<accessRefreshInterface,loginInterface>(
  "post/login",
  async (data, thunkAPI) => {
    try {
        const response = await loginRequest(data);
        return response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "login failed!" });
    }
  },
);

export const signupThunk = createAsyncThunk<signupResponseInterface,signupPostInterface>(
  "post/signup",
  async (data, thunkAPI) => {
    try {
        const response = await signupRequest(data);
        return response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "signup failed!" });
    }
  },
);


export const userProfileThunk = createAsyncThunk<userDataInterface>(
  "post/userProfile",
  async (_,thunkAPI) => {
    try {
        const response = await userProfileRequest();
        return response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.response?.data);
      }
      return thunkAPI.rejectWithValue({ error: "Getting profile data failed! " });
    }
  },
);

