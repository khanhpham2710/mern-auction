import axios from "axios";

// https://mern-auction-yjtj.onrender.com/auth/login

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && (error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(
          "http://localhost:5000/api/v1/user/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // console.error("Token refresh failed:", refreshError);
        // window.location.href = 'http://localhost:5173/auth/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
