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
        // 응답 데이터에서 원하는 배열만 추출
        const items = response?.response?.body?.items?.item;
        // items가 배열이면 그대로, 그렇지 않으면 배열로 감싸서 반환
        return Array.isArray(items) ? items : items ? [items] : [];
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
        // 상세정보도 배열로 감싸서 반환 (필요한 경우)
        const items = response?.response?.body?.items?.item;
        return Array.isArray(items) ? items : items ? [items] : [];
      },
    }),
  })
})

export const {
  useFetchTourListQuery,
  useFetchDetailInfoQuery,
} = tourApi;