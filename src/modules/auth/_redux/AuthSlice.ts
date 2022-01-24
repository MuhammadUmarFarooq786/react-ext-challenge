import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../../../redux/rootReducer";
import * as authThunks from "./AuthThunkActions";
import { LoginDetails } from "./types";

interface AuthState{
  actionsLoading: boolean;
  authenticatedUser : LoginDetails;
  error: any;
}

export const initialAuthState:AuthState = {
  actionsLoading: false,
  authenticatedUser :{
    emailOrPhone: undefined,
  password: undefined
  } as LoginDetails,
  error: null 
};


// CreateSlice use Immer under the hood. So, we can do state mutation and
// Immer will do the job of state recreation for you
// https://stackoverflow.com/questions/63672469/redux-toolkit-usage-with-typescript-without-state-mutation

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    userLogout: (state, action) => {
      // payload not required at this point
      // const {loginDetails} = action.payload;
      return {
        ...state,
        emailOrPhone: undefined,
        password: undefined
      };
    }
  },
  extraReducers: (builder) => {
    // Get Devices Extra Reducers
    builder
      .addCase(authThunks.loginUser.rejected, (state, action) => {
        
        return {
          ...state,
          error: action.payload,
          actionsLoading: false,
        };
      })
      .addCase(authThunks.loginUser.pending, (state, action) => {
        return { ...state, error: null, actionsLoading: true };
      })
      .addCase(authThunks.loginUser.fulfilled, (state, action) => {
        const { authenticatedUser } = action.payload;
        
        return {
            ...state,
            actionsLoading: false,
            authenticatedUser
          };
      })      
  },
});
