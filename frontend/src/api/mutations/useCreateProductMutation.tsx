import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import productsService from "../services/products.service";
import { CreateProductSchema } from "@/schemas/createProduct.schema";

const useCreateProductMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: CreateProductSchema }) =>
      productsService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Exitoso",
        description: `Product #${data.id} creado correctamente`,
        variant: "success",
      });
      navigate(`/admin/products/${data.id}/detail`);
    },
    onError: (error) => {
      console.error("Error creating product", error);
    },
  });
};

export default useCreateProductMutation;
