import {all} from "redux-saga/effects";
import {combineReducers} from "redux";
import {authSlice} from "./../modules/auth/_redux/AuthSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});



export type RootState = ReturnType<typeof rootReducer>
 