import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./auth.api";
import type { LoginPayload } from "./auth.type";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginPayload) => loginApi(data),
  });
};