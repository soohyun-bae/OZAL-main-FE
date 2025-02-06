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
      const filteredData =
        response.data?.response?.body?.items?.item.map((i) => ({
          code: i.code,
          name: i.name,
        })) || [];
      console.log(response.data.response.body);
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
      const filteredData =
        response.data?.response?.body?.items?.item.map((i) => ({
          code: i.code,
          name: i.name,
        })) || [];
      console.log(response.data.response.body);
      return filteredData;
    } catch (error) {
      console.error("districtName API호출 중 오류 발생:", error);
      throw error;
    }
  }
);

export const fetchTourList = createAsyncThunk(
  "tourList/fetchTourList",
  async ({ areaCode, districtCode }) => {
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
      // addr1, contentid, firstimage2, title
      const filteredData =
        response.data?.response?.body?.items?.item.map((i) => ({
          addr1: i.addr1,
          contentid: i.contentid,
          firstimage2: i.firstimage2,
          title: i.title,
        })) || [];
      console.log(response.data);
      return filteredData;
    } catch (error) {
      console.error("tourList API호출 중 오류 발생:", error);
      throw error;
    }
  }
);

export const fetchDetailInfo = createAsyncThunk(
  "detailInfo/fetchDetailInfo",
  async (areaCode) => {
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
            contentId: areaCode,
            overviewYN: "Y",
            defaultYN: 'Y',
            firstImageYN: 'Y',
            addrinfoYN: 'Y',
          },
        }
      );
      // contentid, hmpg, title, firstimage, firstimage2, addr1, overview
      const body = response.data?.response?.body?.items?.item.map((i) => ({
        // contentid: i.contentid,
        hmpg: i.hmpg,
        title: i.title,
        firstimage: i.firstimage,
        addr1: i.addr1,
        overview: i.overview,
      })) || [];
      console.log(response.data);
      return body;
    } catch (error) {
      console.error("detailInfo API호출 중 오류 발생:", error);
      throw error;
    }
  }
);
