import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com", // thay bằng đầu api mà be trả
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");// thay accessToken bằng tên token mà be đặt

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response?.data || error)
);

export default axiosInstance;