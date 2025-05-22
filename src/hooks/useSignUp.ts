import { useMutation } from "@tanstack/react-query";
import AuthServices from "../services/AuthServices";
import type { SignUpType } from "../types/AuthTypes";

export default function useSignUp() {
  const { signUp } = AuthServices();

  return useMutation({
    mutationFn: (data: SignUpType) => signUp(data),
    onError: (error) => console.log(error),
  });
}
