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

// export const fetchTourList = createAsyncThunk(
//   "tourList/fetchTourList",
//   async ({ areaCode, districtCode }) => {
//     try {
//       const response = await tourAPI.get(
//         "/areaBasedList1",
//         {
//           params: {
//             areaCode: areaCode,
//             sigunguCode: districtCode,
//             contentTypeId: 12
//           },
//         }
//       );
//       // addr1, contentid, firstimage2, title
//       const filteredData =
//         response.data?.response?.body?.items?.item.map((i) => ({
//           addr1: i.addr1,
//           contentid: i.contentid,
//           firstimage2: i.firstimage2,
//           title: i.title,
//         })) || [];
//       return filteredData;
//     } catch (error) {
//       console.error("tourList API호출 중 오류 발생:", error);
//       throw error;
//     }
//   }
// );

// export const fetchDetailInfo = createAsyncThunk(
//   "detailInfo/fetchDetailInfo",
//   async (contentId) => {
//     try {
//       const response = await tourAPI.get(
//         "/detailCommon1",
//         {
//           params: {
//             contentId: contentId,
//             overviewYN: "Y",
//             defaultYN: 'Y',
//             firstImageYN: 'Y',
//             addrinfoYN: 'Y',
//           },
//         }
//       );

//       let items = response.data?.response?.body?.items?.item;
//       if (items && !Array.isArray(items)) {
//         items = [items];  // 배열로 감싸기
//       }

//       // contentid, hmpg, title, firstimage, firstimage2, addr1, overview
//       const body = items? items.map((i) => ({
//         contentid: i.contentid,
//         hmpg: i.hmpg,
//         title: i.title,
//         firstimage: i.firstimage,
//         addr1: i.addr1,
//         overview: i.overview,
//       })) : [];
//       return body;
//     } catch (error) {
//       console.error("detailInfo API호출 중 오류 발생:", error);
//       throw error;
//     }
//   }
// );
