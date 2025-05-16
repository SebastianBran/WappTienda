import { useQuery } from "@tanstack/react-query";
import productsService from "../services/products.service";

const useGetAllProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productsService.getAll,
  });
};

export default useGetAllProductsQuery;
