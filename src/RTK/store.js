import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage";
// import sessionStorageEngine from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import { postSlice } from "./postSlice";
import { createTransform } from "redux-persist";
import modalReducer from "./modalSlice";
import { tourApi } from "./tour/tourApi";
import { citySlice, districtSlice } from "./tour/slice";

const authTransform = createTransform(
  (inboundState) => {
    const { register2, ...restState } = inboundState;
    console.log("Auth state:", inboundState);

    return restState;
  },
  (outboundState) => {
    return outboundState;
  },
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transforms: [authTransform],
};


// const authPersistConfig = {
//   key: "auth",
//   storage: sessionStorageEngine, // auth 슬라이스는 세션 스토리지에 저장
// };

const rootReducer = combineReducers({
  auth: authReducer,
  city: citySlice.reducer,
  district: districtSlice.reducer,
  [tourApi.reducerPath]: tourApi.reducer,
  post: postSlice.reducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          "tourApi.queries",
          "tourApi.mutations",
        ],
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "tourApi/executeQuery/fulfilled",
          "tourApi/executeQuery/pending",
          "tourApi/executeQuery/rejected",
        ],
      },
    }).concat(tourApi.middleware),
});

export const persistor = persistStore(store);
