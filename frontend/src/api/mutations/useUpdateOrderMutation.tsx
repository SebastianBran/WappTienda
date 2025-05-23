import { useMutation, useQueryClient } from "@tanstack/react-query";
import ordersService from "../services/orders.service";
import { UpdateOrderSchema } from "@/schemas/updateOrder.schema";
import { toast } from "@/hooks/use-toast";

const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrderSchema }) =>
      ordersService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      toast({
        title: "Exitoso",
        description: `Orden #${data.id} actualizada correctamente`,
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error updating order", error);
    },
  });
};

export default useUpdateOrderMutation;
