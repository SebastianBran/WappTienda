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
        title: "Success",
        description: `Order ${variables.id} deleted successfully`,
        variant: "default",
      });
    },
  });
};

export default useDeleteOrderMutation;
