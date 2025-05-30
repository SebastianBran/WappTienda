import { useParams } from "react-router-dom";
import useUpdateCustomerMutation from "@/api/mutations/useUpdateCustomerMutation";
import { useFormContext } from "react-hook-form";
import { UpdateCustomerSchema } from "@/schemas/updateCustomer.schema";
import { CustomerAttributes } from "../../components";
import EditFormLayout from "@/components/common/EditFormLayout";
import { EditCustomerHeader } from "./components";

const EditCustomer = () => {
  const { customerId } = useParams();
  const form = useFormContext<UpdateCustomerSchema>();
  const { reset } = form;
  const { mutate: updateCustomerMutate } = useUpdateCustomerMutation();

  const onSubmit = (data: UpdateCustomerSchema) => {
    updateCustomerMutate(
      { id: Number(customerId), data },
      {
        onSuccess: () => {
          reset(data);
        },
      },
    );
  };

  return (
    <EditFormLayout onSubmit={onSubmit}>
      <div className="space-y-6">
        <EditCustomerHeader />

        <form className="space-y-6">
          <CustomerAttributes />
        </form>
      </div>
    </EditFormLayout>
  );
};

export default EditCustomer;
