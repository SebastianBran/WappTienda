import { OrderSummary, OrderUpdateForm, OrderCustomerCard } from "./components";
import { useContext } from "react";
import { OrderDetailContext } from "./OrderDetailContext";
import useUpdateOrderMutation from "@/api/mutations/useUpdateOrderMutation";
import { UpdateOrderSchema } from "@/schemas/updateOrder.schema";
import { useFormContext } from "react-hook-form";
import OrderDetailHeader from "./components/OrderDetailHeader";
import EditFormLayout from "@/components/common/EditFormLayout";

const OrderDetail = () => {
  const { order } = useContext(OrderDetailContext);
  const { mutate: updateOrderMutate } = useUpdateOrderMutation();
  const form = useFormContext<UpdateOrderSchema>();
  const { handleSubmit } = form;

  const onSubmit = (data: UpdateOrderSchema) => {
    updateOrderMutate(
      { id: order.id, data },
      {
        onSuccess: () => {
          form.reset(data);
        },
      },
    );
  };

  return (
    <EditFormLayout onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <OrderDetailHeader />

        <form
          className="grid gap-6 md:grid-cols-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="md:col-span-2 space-y-6">
            <OrderUpdateForm />
            <OrderSummary order={order} />
          </div>

          <div className="flex flex-col space-y-6">
            <OrderCustomerCard customer={order.customer} />
          </div>
        </form>
      </div>
    </EditFormLayout>
  );
};

export default OrderDetail;
