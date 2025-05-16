import { useQuery } from "@tanstack/react-query";
import customersService from "../services/customers.service";

const useGetAllCustomersQuery = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customersService.getAll,
  })
};

export default useGetAllCustomersQuery;
