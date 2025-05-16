import { useMutation, useQueryClient } from "@tanstack/react-query";
import customersService from "../services/customers.service";
import { toast } from "@/hooks/use-toast";
import { UpdateCustomerSchema } from "@/schemas/updateCustomer.schema";

const useUpdateCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCustomerSchema }) =>
      customersService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customer", variables.id] });
      toast({
        title: "Existoso",
        description: `Cliente #${data.id} actualizado correctamente`,
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error updating customer", error);
    },
  });
};

export default useUpdateCustomerMutation;
