import axiosInstance from "../../config/axios";
import type { LoginPayload } from "./auth.type";

export const loginApi = (data: LoginPayload) =>
    axiosInstance.post("/auth/login", data);