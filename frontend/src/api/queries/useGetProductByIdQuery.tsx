import { useQuery } from "@tanstack/react-query";
import productsService from "../services/products.service";

const useGetProductByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getById(id),
    enabled: !!id,
  });
};

export default useGetProductByIdQuery;
