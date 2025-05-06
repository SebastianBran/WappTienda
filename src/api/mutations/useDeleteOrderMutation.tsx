import { useMutation, useQueryClient } from "@tanstack/react-query";
import ordersService from "../services/orders.service";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const useDeleteOrderMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => ordersService.delete(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", "orders"] });
      navigate("/admin/orders");
      toast({
        title: "Exitoso",
        description: `Orden #${variables.id} eliminada`,
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting order", error);
    },
  });
};

export default useDeleteOrderMutation;
