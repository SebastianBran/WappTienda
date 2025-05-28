import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useUpdateCustomerMutation from "@/api/mutations/useUpdateCustomerMutation";
import { useFormContext } from "react-hook-form";
import { UpdateCustomerSchema } from "@/schemas/updateCustomer.schema";
import ViewLoading from "@/components/common/ViewLoading";
import SaveChangesToolbar from "@/components/common/SaveChangesToolbar";
import { cn } from "@/lib/utils";
import EditCustomerContext from "./EditCustomerContext";
import { CustomerAttributes } from "../../components";

const EditCustomer = () => {
  const navigate = useNavigate();
  const { customer, isPending } = useContext(EditCustomerContext);
  const form = useFormContext<UpdateCustomerSchema>();
  const { handleSubmit, reset, formState } = form;
  const { mutate: updateCustomerMutate } = useUpdateCustomerMutation();
  const isFormChanged = formState.isDirty;

  if (isPending || !customer) {
    return <ViewLoading />;
  }

  const onSubmit = (data: UpdateCustomerSchema) => {
    updateCustomerMutate(
      { id: customer.id, data },
      {
        onSuccess: () => {
          reset(data);
        },
      },
    );
  };

  return (
    <>
      {isFormChanged && <SaveChangesToolbar form={form} onSubmit={onSubmit} />}
      <div className={cn("container mx-auto py-6", isFormChanged && "pt-16")}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  navigate(`/admin/customers/${customer.id}/detail`)
                }
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">Cliente</h1>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <CustomerAttributes />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
