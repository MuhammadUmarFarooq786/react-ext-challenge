import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {reduxBatch} from "@manaflair/redux-batch";
import {persistStore} from "redux-persist";
import {rootReducer} from "./rootReducer";
import { useDispatch } from "react-redux";

const sagaMiddleware = createSagaMiddleware();
//TODO: check the functionality and behavior of serializableCheck
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: false,
    thunk: true
  }),
  sagaMiddleware
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch]
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

// const useThunkDispatch = () => useDispatch<typeof store.dispatch>()

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store);


export default store;
