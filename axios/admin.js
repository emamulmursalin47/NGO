import axios from "axios";
import url from "../config/main-url";

// Create an Axios instance
const axiosAdmin = axios.create({
  baseURL: url,
});

// Add a request interceptor
axiosAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("refesh");
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(refreshToken);
        const response = await axios.post(`${url}/auth/refresh`, {
          refreshToken,
        });
        const { token } = response.data;

        localStorage.setItem("accessToken", token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("id");
        localStorage.removeItem("userType");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("name");
        localStorage.removeItem("phone");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAdmin;
