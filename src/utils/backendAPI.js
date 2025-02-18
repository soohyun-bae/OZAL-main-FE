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
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (authToken) {
      const isExpired = checkJWTExp(authToken);
      if (isExpired) {
        try {
          const response = await backendAPI.post("/ozal/refresh", {
            refreshToken,
          });
          const { newAccessToken } = response.data;

          localStorage.setItem("token", newAccessToken);
          authToken = newAccessToken;
        } catch (Error) {
          console.error(Error);
          return Promise.reject(Error);
        }
      }

      config.headers.Authorization = `Bearer ${authToken}`;
      if (refreshToken) {
        config.headers.Refresh = `${refreshToken}`;
      }
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
      localStorage.setItem("token", newAuthToken);
      sessionStorage.setItem("token", newAuthToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
