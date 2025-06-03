import { useMutation, useQueryClient } from "@tanstack/react-query";
import productsService from "../services/products.service";
import { toast } from "@/hooks/use-toast";

const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => productsService.delete(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product", "products"] });
      toast({
        title: "Exitoso",
        description: `Producto #${variables.id} eliminado`,
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting product", error);
    },
  });
};

export default useDeleteProductMutation;
