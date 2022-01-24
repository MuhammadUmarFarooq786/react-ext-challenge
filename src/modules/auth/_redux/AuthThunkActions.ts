import { createAsyncThunk } from "@reduxjs/toolkit";
import * as requestFromServer from "./AuthCrud";
import { LoginDetails } from "./types";

// All actions that does some async logic like API calls and Files reading etc.

//queryParams are no longer needed
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginDetails:LoginDetails,thunkAPI: any) => {
    // have to find the datatype of thunkAPI
    try {
      const response = await requestFromServer.login(loginDetails);
      return response.data;
    } catch (err:any) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return thunkAPI.rejectWithValue(JSON.stringify(err.response.data));
    }
  }
);
