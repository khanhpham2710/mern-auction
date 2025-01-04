import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mern-auction-yjtj.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post(
          "/user/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // window.location.href = 'http://localhost:5173/auth/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
