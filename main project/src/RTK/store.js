import { configureStore } from "@reduxjs/toolkit";
import { citySlice, detailInfoSlice, districtSlice, tourListSlice } from "./slice";

export const store = configureStore({
  reducer: {
    city: citySlice.reducer,
    district: districtSlice.reducer,
    tourList: tourListSlice.reducer,
    detailInfo: detailInfoSlice.reducer,
  },
});
