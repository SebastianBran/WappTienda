import { useMutation, useQueryClient } from "@tanstack/react-query";
import ordersService from "../services/orders.service";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CreateOrderDto } from "@/types/orders";

const useCreateOrderMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: CreateOrderDto }) =>
      ordersService.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Exitoso",
        description: `Orden #${data.id} creada correctamente`,
        variant: "success",
      });
      navigate(`/admin/orders/${data.id}/detail`);
    },
    onError: (error) => {
      console.error("Error creating order", error);
    },
  });
};

export default useCreateOrderMutation;
