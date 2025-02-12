import axios from "axios";

const tourAPI = axios.create({
  baseURL: "http://apis.data.go.kr/B551011/KorService1",
  params: {
    serviceKey: import.meta.env.VITE_API_KEY,
    MobileOS: "ETC",
    MobileApp: "AppTest",
    pageNo: 1,
    numOfRows: 10,
    _type: "json",
  },
});

export default tourAPI;