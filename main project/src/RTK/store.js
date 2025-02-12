import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  citySlice,
  detailInfoSlice,
  districtSlice,
  tourListSlice,
} from "./slice";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import { postSlice } from "./postSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
  city: citySlice.reducer,
  district: districtSlice.reducer,
  tourList: tourListSlice.reducer,
  detailInfo: detailInfoSlice.reducer,
  post: postSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
