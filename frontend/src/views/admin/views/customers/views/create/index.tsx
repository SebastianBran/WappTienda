import { FC } from "react";
import { CustomerAttributes } from "../../components";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CreateCustomerSchema } from "@/schemas/createCustomer.schema";
import useCreateCustomerMutation from "@/api/mutations/useCreateCustomerMutation";
import Spinner from "@/components/common/Spinner";

const CreateCustomer: FC = () => {
  const navigate = useNavigate();
  const { mutate: createCustomerMutate, isPending } =
    useCreateCustomerMutation();
  const { handleSubmit, reset } = useFormContext<CreateCustomerSchema>();

  const onSubmit = (data: CreateCustomerSchema) => {
    createCustomerMutate(
      { data },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/products")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Crear Producto</h1>
            </div>
          </div>
        </div>

        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <CustomerAttributes />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : "Crear producto"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
