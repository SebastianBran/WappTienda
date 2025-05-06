import { useQuery } from "@tanstack/react-query";
import ordersService from "../services/orders.service";

const useGetAllOrdersQuery = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: ordersService.getAll,
  });
};

export default useGetAllOrdersQuery;
