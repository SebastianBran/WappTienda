import { Button } from "@/components/ui/button";
import { CreateOrderSchema } from "@/schemas/createOrder.schema";
import { ArrowLeft } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCreateOrderMutation from "@/api/mutations/useCreateOrderMutation";
import Spinner from "@/components/common/Spinner";
import {
  CustomerDetailCard,
  OrderItemsCard,
  OrderSummaryCard,
} from "./components";

const CreateOrder = () => {
  const navigate = useNavigate();
  const { mutate: createOrderMutate, isPending } = useCreateOrderMutation();
  const { reset, handleSubmit } = useFormContext<CreateOrderSchema>();

  const onSubmit = async (data: CreateOrderSchema) => {
    const orderItems = data.orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
    const payload = {
      customer: data.customer,
      orderItems: orderItems,
    };

    createOrderMutate(
      { data: payload },
      {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          console.error("Error creating order:", error);
        },
      },
    );
  };

  return (
    <div className="container max-w-2xl mx-auto py-6">
      <div className="flex items-center gap-4 pb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/orders")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">Crear orden</h1>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <CustomerDetailCard />
        <OrderItemsCard />
        <OrderSummaryCard />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Spinner /> : "Crear orden"}
        </Button>
      </form>
    </div>
  );
};

export default CreateOrder;
