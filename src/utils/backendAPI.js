import axios from "axios";

const backendAPI = axios.create({
  baseURL: "http://3.34.96.155",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default backendAPI;

// 요청이 전달되기 전에 헤더에 토큰 넣기
backendAPI.interceptors.request.use(
  async (config) => {
    let authToken =
      localStorage.getItem("access token") || sessionStorage.getItem("access token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (authToken) {
      const isExpired = checkJWTExp(authToken);
      if (isExpired) {
        try {
          const response = await backendAPI.post("/ozal/refresh/", {
            refreshToken,
          });
          const { tokens } = response.data;
          // const rememberUser = localStorage.getItem('rememberUser') === 'true';

          // if(rememberUser) {
          //   localStorage.setItem("access token", newAccessToken);
          // } else {
          //   sessionStorage.setItem('access token', newAccessToken);
          // }

          authToken = tokens.access;

          sessionStorage.setItem("access token", authToken);
          localStorage.setItem("refresh_token", tokens.refresh);
        } catch (error) {
          console.error('토큰 갱신 실패', error);
          return Promise.reject(error);
        }
      }

      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backendAPI.interceptors.response.use(
  async (response) => {
    const newAuthToken = response?.headers?.authorization;

    if (newAuthToken) {
      localStorage.setItem("access token", newAuthToken);
      sessionStorage.setItem("access token", newAuthToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
