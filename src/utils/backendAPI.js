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
    const authToken = localStorage.getItem("tokens");

    if (authToken) {
      const { access } = JSON.parse(authToken);
      config.headers.Authorization = `Bearer ${access}`;
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

    if (error.response.status === 401) {
      try {
        const { refresh } = JSON.parse(localStorage.getItem("tokens"));

        const response = await backendAPI.post("/ozal/refresh/", {
          refreshToken: refresh,
        });

        if(response.data.accessToken) {
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("tokens", JSON.stringify({ access: newAccessToken, refresh }));

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
