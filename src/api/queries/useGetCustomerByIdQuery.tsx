import { useQuery } from "@tanstack/react-query";
import customersService from "../services/customers.service";

const useGetCustomerByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => customersService.getById(id),
    enabled: !!id,
  });
}

export default useGetCustomerByIdQuery;
