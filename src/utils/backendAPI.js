import axios from "axios";

const backendAPI = axios.create({
  baseURL: "http://13.125.107.9:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default backendAPI;

// 요청이 전달되기 전에 헤더에 토큰 넣기
backendAPI.interceptors.request.use(
  async (config) => {
    const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
    if (persistRoot) {
      const authData = JSON.parse(persistRoot.auth);
      const accessToken = authData.token;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
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
        const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
        const authData = JSON.parse(persistRoot.auth);
        const refresh = authData.refresh_token;

        const response = await backendAPI.post("/ozal/refresh/", {
          refresh: refresh,
        });

        if (response.data.accessToken) {
          const newAccessToken = response.data.accessToken;
          localStorage.setItem(
            "tokens",
            JSON.stringify({ access: newAccessToken, refresh })
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
