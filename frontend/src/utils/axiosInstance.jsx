import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mern-auction-yjtj.onrender.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance;
