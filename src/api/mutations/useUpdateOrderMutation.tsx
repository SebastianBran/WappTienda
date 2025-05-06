import { useMutation, useQueryClient } from "@tanstack/react-query";
import ordersService from "../services/orders.service";
import { UpdateOrderFormType } from "@/schemas/updateOrder.schema";
import { toast } from "@/hooks/use-toast";

const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrderFormType }) =>
      ordersService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["order", variables.id], data);
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
