import axios from "axios";
import type { LoginPayload } from "./auth.type";

const AGENT_API_URL = import.meta.env.VITE_AGENT_API_URL || "http://localhost:8000";

const agentAuthClient = axios.create({
  baseURL: `${AGENT_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = async (data: LoginPayload) => {
  // Ánh xạ username nhập vào (số điện thoại) gửi lên backend AI Agent
  const response = await agentAuthClient.post("/login", {
    phone: data.username,
    password: data.password,
  });

  const backendData = response.data;
  if (!backendData.success) {
    throw new Error(backendData.message || "Đăng nhập thất bại");
  }

  const payload = backendData.data;

  // Kiểm tra quyền truy cập (chỉ cho phép tài khoản có role là admin)
  if (payload.user.role !== "admin") {
    throw new Error("Tài khoản của bạn không có quyền truy cập quản trị.");
  }

  // Ánh xạ payload trả về từ backend thành format dữ liệu mà Redux Slice và LoginPage mong muốn
  return {
    id: payload.user.user_id,
    username: payload.user.phone,
    email: payload.user.email || "",
    firstName: payload.user.full_name || "Admin CSKH",
    lastName: "",
    gender: "male",
    image: "",
    accessToken: payload.access_token,
    refreshToken: payload.access_token, // Dùng chung access_token làm refresh_token do backend chưa phát hành
  };
};