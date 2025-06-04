import { SettingItem } from "@/types/setting";
import http from "./http-common";

class ConfigurationService {
  async getAll(
    category?: string,
  ): Promise<Record<string, string | number | boolean | object>> {
    const response = await http.get("/configurations", {
      params: {
        category: category,
      },
    });
    return response.data;
  }

  async update(configurations: Partial<SettingItem>[]): Promise<SettingItem[]> {
    const response = await http.put("/configurations", { configurations });
    return response.data;
  }
}

export default new ConfigurationService();
