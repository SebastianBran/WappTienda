import http from "./http-common";
import { LoginResponse } from "@/types/auth";

class AuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await http.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    return response.data;
  }
}

export default new AuthService();
