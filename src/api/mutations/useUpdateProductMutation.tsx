import { useMutation, useQueryClient } from "@tanstack/react-query";
import productsService from "../services/products.service";
import { UpdateProductSchema } from "@/schemas/updateProduct.schema";
import { toast } from "@/hooks/use-toast";

const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductSchema }) =>
      productsService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", variables.id] });
      toast({
        title: "Success",
        description: `Product #${data.id} updated successfully`,
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error updating product", error);
    },
  });
};

export default useUpdateProductMutation;
