import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCityName,
  // fetchDetailInfo,
  fetchDistrictName,
  // fetchTourList,
} from "./thunk";

export const citySlice = createSlice({
  name: "city",
  initialState: {
    data: [],
    loading: false,
    selectedCity: null,
  },
  reducers: {
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCityName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCityName.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedCity } = citySlice.actions;

export const districtSlice = createSlice({
  name: "district",
  initialState: {
    data: [],
    allDistrictData: [],
    loading: false,
    selectedDistrict: null,
  },
  reducers: {
    setSelectedDistrict(state, action) {
      state.selectedDistrict = action.payload;
    },
    setAllDistrictData(state, action) {
      state.allDistrictData = action.payload; // 서울의 모든 구 데이터 설정
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistrictName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDistrictName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.allDistrictData = action.payload;
      })
      .addCase(fetchDistrictName.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedDistrict, setAllDistrictData } =
  districtSlice.actions;
