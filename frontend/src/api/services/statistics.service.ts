import { Statistics } from "@/types/statistics";
import http from "./http-common";

class StatisticsService {
  async getStatistics(): Promise<Statistics> {
    const response = await http.get("/statistics");
    return response.data;
  }
}

export default new StatisticsService();
