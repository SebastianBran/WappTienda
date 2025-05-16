import { useMutation, useQueryClient } from "@tanstack/react-query";
import customersService from "../services/customers.service";
import { toast } from "@/hooks/use-toast";

const useDeleteCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id } : { id: number }) =>
      customersService.delete(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["customer", "customers"] });
      toast({
        title: "Existoso",
        description: `Consumidor #${variables.id} eliminado`,
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting customer", error);
    },
  })
};

export default useDeleteCustomerMutation;
