import { useQuery } from "@tanstack/react-query";
import statisticsService from "../services/statistics.service";

const useGetStatisticsQuery = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: () => statisticsService.getStatistics(),
  });
};

export default useGetStatisticsQuery;
