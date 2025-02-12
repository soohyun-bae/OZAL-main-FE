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
import {createTransform} from "redux-persist";

const authTransform = createTransform(
  (inboundState) => {
    const { register2, ...restState } = inboundState;
    console.log('Auth state:', inboundState);

    return restState; 
  },
  (outboundState) => {
    return outboundState;
  },
  { whitelist: ['auth'] }
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['auth'],
  transforms: [authTransform]
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
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], 
        ignoredPaths: ["some.nested.path"], 
      },
    });
    return defaultMiddleware;
  },
});

export const persistor = persistStore(store);
