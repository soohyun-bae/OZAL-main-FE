import { createAsyncThunk } from "@reduxjs/toolkit";
import tourAPI from "../../utils/tourAPI";

export const fetchCityName = createAsyncThunk(
  "city/fetchCityName",
  async () => {
    try {
      const response = await tourAPI.get("/areaCode1");
      const filteredData =
        response.data?.response?.body?.items?.item.map((i) => ({
          code: i.code,
          name: i.name,
        })) || [];
      return filteredData;
    } catch (error) {
      console.error("cityName API호출 중 오류 발생:", error);
      throw error;
    }
  }
);

export const fetchDistrictName = createAsyncThunk(
  "district/fetchDistrictName",
  async (code) => {
    try {
      const response = await tourAPI.get("/areaCode1", {
        params: {
          areaCode: code,
        },
      });
      const filteredData =
        response.data?.response?.body?.items?.item.map((i) => ({
          code: i.code,
          name: i.name,
        })) || [];
      return filteredData;
    } catch (error) {
      console.error("districtName API호출 중 오류 발생:", error);
      throw error;
    }
  }
);
