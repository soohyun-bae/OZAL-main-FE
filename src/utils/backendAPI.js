import axios from "axios";

const backendAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default backendAPI;

// 요청이 전달되기 전에 헤더에 토큰 넣기
backendAPI.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backendAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await backendAPI.post("/ozal/refresh/", {
          token: accessToken,
        }); // refresh api 변경하기

        if (response.data.accessToken) {
          const newAccessToken = response.data.accessToken;
          localStorage.setItem(
            "accessToken",
            accessToken
          );

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return backendAPI(originalRequest);
        }
      } catch (error) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }
    }
  }
);
