import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const tourApi = createApi({
  reducerPath: 'tourApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://apis.data.go.kr/B551011/KorService1',
  }),
  endpoints: (builder) => ({
    fetchTourList: builder.query({
      query: ({ areaCode, districtCode }) => ({
        url: '/areaBasedList1',
        method: 'get',
        params: {
          areaCode: areaCode,
          sigunguCode: districtCode,
          contentTypeId: 12,
          serviceKey: import.meta.env.VITE_API_KEY,
          MobileOS: "ETC",
          MobileApp: "AppTest",
          pageNo: 1,
          numOfRows: 10,
          _type: "json",
        },
      }),
      transformResponse: (response) => {
        const filteredData =
        response.response?.body?.items?.item.map((i) => ({
          addr1: i.addr1,
          contentid: i.contentid,
          firstimage2: i.firstimage2,
          title: i.title,
        })) || [];
      return filteredData;
      },
    }),

    fetchDetailInfo: builder.query({
      query: (contentId) => ({
        url: "/detailCommon1",
        method: "get",
        params: {
          contentId: contentId,
          overviewYN: "Y",
          defaultYN: "Y",
          firstImageYN: "Y",
          addrinfoYN: "Y",
          serviceKey: import.meta.env.VITE_API_KEY,
          MobileOS: "ETC",
          MobileApp: "AppTest",
          _type: "json",
        },
      }),
      transformResponse: (response) => {
        const items = response?.response?.body?.items?.item;
        
        const body = items
          ? items.map((i) => ({
              contentid: i.contentid,
              hmpg: i.hmpg,
              title: i.title,
              firstimage: i.firstimage,
              addr1: i.addr1,
              overview: i.overview,
            }))
          : [];
          
        return body;
      },
    }),
  })
})

export const {
  useFetchTourListQuery,
  useFetchDetailInfoQuery,
} = tourApi;