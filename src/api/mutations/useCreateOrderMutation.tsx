import { CreateOrderSchema } from "@/schemas/createOrder.schema";
import { useMutation } from "@tanstack/react-query";
import ordersService from "../services/orders.service";

const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: CreateOrderSchema }) =>
      ordersService.create(data),
  });
};

export default useCreateOrderMutation;
