import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import notify from "./notification";
import tokenManager from "../common/utils/token-manager";
import { handleRefreshToken } from "../common/utils/refresh-token";
import type { IResponse } from "../service/type/response.type";
export interface IOriginRequest extends AxiosRequestConfig {
  _retry: boolean;
}

const handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  //check token
  const access_token = tokenManager.getAccessToken();
  if (access_token && config.headers) {
    config.headers["Authorization"] = "Bearer " + access_token;
  }
  config.validateStatus = function (status) {
    return status >= 200 && status < 300; // default
  };
  return config;
};

const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const handleResponse = (response: AxiosResponse) => {
  if (response.config.responseType === "blob") {
    return response;
  }

  if (response.config.method === "get") {
    return (
      response.data?.data?.result ??
      response.data?.data ??
      response.data?.result ??
      response.data
    );
  }

  return response.data;
};

const handleResponseError = async (error: AxiosError<IResponse<any>>) => {
  // console.log("Request error: ", { error });

  const originalRequest = error.config as IOriginRequest;

  // Không có phản hồi từ server (timeout, mất mạng, CORS,...)
  if (!error.response) {
    notify.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.");
    return Promise.reject(error);
  }

  const status = error.response.status;
  // console.log("Error status: ", { status });
  // 401 - Token hết hạn, thử refresh
  if (status === 401 && !originalRequest._retry) {
    return handleRefreshToken(originalRequest);
  }

  // 403 - Không có quyền truy cập
  if (status === 403) {
    notify.warning("Bạn không có quyền thực hiện hành động này.");
    return Promise.reject(error);
  }

  // 404 - Không tìm thấy API hoặc tài nguyên
  if (status === 404) {
    notify.warning("Không tìm thấy tài nguyên hoặc đường dẫn yêu cầu.");
    return Promise.reject(error);
  }

  // 500 - Lỗi hệ thống
  if (status >= 500) {
    notify.error("Máy chủ gặp sự cố. Vui lòng thử lại sau ít phút.");
    return Promise.reject(error);
  }

  // Các lỗi khác (400, 422,…)
  const message = error.response.data?.message || error.message || "Đã có lỗi xảy ra. Vui lòng thử lại.";

  notify.error(message);

  return Promise.reject(error.response);
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(handleRequest as any, handleRequestError);
axiosClient.interceptors.response.use(handleResponse, handleResponseError);

export default axiosClient;
