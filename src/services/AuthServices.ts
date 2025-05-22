import type { AxiosResponse } from "axios";
import type { LoginType, SignUpType } from "../types/AuthTypes";
import type CommonResponse from "../infrastucture/CommonResponse";
import axios from "axios";
import Endpoint from "../infrastucture/Endpoint";

interface AuthServicesTypes {
  signUp: (data: SignUpType) => Promise<AxiosResponse<CommonResponse<string>>>;
  login: (
    data: LoginType
  ) => Promise<
    AxiosResponse<CommonResponse<{ token: string; userId: string }>>
  >;
}

export default function AuthServices(): AuthServicesTypes {
  const signUp = (data: SignUpType) => {
    return axios.put(`${Endpoint.AUTH}/sign-up`, data);
  };

  const login = (data: LoginType) => {
    return axios.post(`${Endpoint.AUTH}/login`, data);
  };

  return { signUp, login };
}
