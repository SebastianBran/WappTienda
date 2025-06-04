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
  const form = useFormContext<CreateCustomerSchema>();
  const { handleSubmit, reset } = form;

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
    <div className="container mx-auto p-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/customers")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Crear Cliente</h1>
            </div>
          </div>
        </div>

        <form className="grid gap-6">
          <CustomerAttributes />

          <Button
            className="w-full"
            disabled={isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? <Spinner /> : "Crear cliente"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
