import { LoginFormType } from "@/schemas/login.schema";
import http from "./http-common";

class AuthService {
  login({ username, password }: LoginFormType) {
    return http.post("/auth/login", {
      username,
      password,
    });
  }
}

export default new AuthService();
