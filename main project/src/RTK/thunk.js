import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCityName = createAsyncThunk(
  "city/fetchCityName",
  async () => {
    try {
      const response = await axios.get(
        "http://apis.data.go.kr/B551011/KorService1/areaCode1",
        {
          params: {
            serviceKey: import.meta.env.VITE_API_KEY,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            pageNo: 1,
            numOfRows: 10,
            _type: "json",
          },
        }
      );
      const body = response.data?.response?.body
      console.log(response.data.response.body);
      return body;
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
      const response = await axios.get(
        "http://apis.data.go.kr/B551011/KorService1/areaCode1",
        {
          params: {
            serviceKey: import.meta.env.VITE_API_KEY,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            pageNo: 1,
            numOfRows: 10,
            _type: "json",
            areaCode: code,
          },
        }
      );
      const body = response.data?.response?.body
      console.log(response.data.response.body);
      return body;
    } catch (error) {
      console.error("districtName API호출 중 오류 발생:", error);
      throw error;
    }
  }
);

export const fetchTourList = createAsyncThunk(
  "tourList/fetchTourList",
  async ({areaCode, districtCode}) => {
    try {
      const response = await axios.get(
        "http://apis.data.go.kr/B551011/KorService1/areaBasedList1",
        {
          params: {
            serviceKey: import.meta.env.VITE_API_KEY,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            pageNo: 1,
            numOfRows: 10,
            _type: "json",
            areaCode: areaCode,
            sigunguCode: districtCode,
          },
        }
      );
      const body = response.data?.response?.body
      console.log(response.data)
      return body
    } catch (error) {
      console.error("tourList API호출 중 오류 발생:", error);
      throw error;
    }
  }
);

export const fetchDetailInfo = createAsyncThunk(
  'detailInfo/fetchDetailInfo',
  async (contentid) => {
    try {
      const response = await axios.get(
        "	http://apis.data.go.kr/B551011/KorService1/detailCommon1",
        {
          params: {
            serviceKey: import.meta.env.VITE_API_KEY,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            pageNo: 1,
            numOfRows: 10,
            _type: "json",
            contentId: contentid,
            overviewYN: 'Y',
          },
        }
      );
      const body = response.data?.response?.body
      console.log(response.data)
      return body
    } catch (error) {
      console.error("detailInfo API호출 중 오류 발생:", error);
      throw error;
    }
  }
)