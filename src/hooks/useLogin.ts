import { useMutation } from "@tanstack/react-query";
import AuthServices from "../services/AuthServices";
import type { LoginType } from "../types/AuthTypes";

export default function useLogin() {
  const { login } = AuthServices();

  return useMutation({
    mutationFn: (data: LoginType) => login(data),
    onError: (error) => console.log(error),
  });
}
