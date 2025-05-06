import { useQuery } from "@tanstack/react-query";
import ordersService from "../services/orders.service";

const useGetOrderByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => ordersService.getById(id),
    enabled: !!id,
  });
};

export default useGetOrderByIdQuery;
