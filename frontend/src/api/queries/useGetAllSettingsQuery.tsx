import { useQuery } from "@tanstack/react-query";
import settingsService from "../services/settings.service";

const useGetAllSettingsQuery = (category?: string) => {
  return useQuery({
    queryKey: ["settings", category],
    queryFn: () => settingsService.getAll(category),
  });
};

export default useGetAllSettingsQuery;
