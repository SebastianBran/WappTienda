import { CreateCustomerSchema } from "@/schemas/createCustomer.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customersService from "../services/customers.service";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const useCreateCustomerMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: CreateCustomerSchema }) =>
      customersService.create({ ...data, email: data.email || null }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Exitoso",
        description: `Cliente #${data.id} creado exitosamente`,
        variant: "success",
      });
      navigate(`/admin/customers/${data.id}/detail`);
    },
  });
};

export default useCreateCustomerMutation;
