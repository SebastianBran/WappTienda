import { LoginFormType } from "@/schemas/login.schema";
import http from "./http-common";
import { LoginResponse } from "@/types/auth";

class AuthService {
  login({ username, password }: LoginFormType) {
    return http.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
  }
}

export default new AuthService();
