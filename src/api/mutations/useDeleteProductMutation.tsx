import { useMutation, useQueryClient } from "@tanstack/react-query";
import productsService from "../services/products.service";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const useDeleteProductMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => productsService.delete(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product", "products"] });
      navigate("/admin/products");
      toast({
        title: "Exitoso",
        description: `Product #${variables.id} deleted`,
        variant: "success",
      });
    },
  });
};

export default useDeleteProductMutation;
