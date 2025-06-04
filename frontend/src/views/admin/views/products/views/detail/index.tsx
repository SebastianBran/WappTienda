import { useParams } from "react-router-dom";
import {
  ProductInventory,
  ProductDescription,
  ProductPricing,
  ProductAttributes,
} from "@/views/admin/views/products/components";
import { useFormContext } from "react-hook-form";
import { UpdateProductSchema } from "@/schemas/updateProduct.schema";
import useUpdateProductMutation from "@/api/mutations/useUpdateProductMutation";
import { ProductDetailHeader } from "./components";
import EditFormLayout from "@/components/common/EditFormLayout";

const ProductDetail = () => {
  const { productId } = useParams();
  const { mutate: updateProductMutate } = useUpdateProductMutation();
  const form = useFormContext<UpdateProductSchema>();
  const { reset } = form;

  const onSubmit = (data: UpdateProductSchema) => {
    updateProductMutate(
      { id: Number(productId), data },
      {
        onSuccess: () => {
          reset(data);
        },
      },
    );
  };

  // TODO: Implement a error view if the product is not found

  return (
    <EditFormLayout onSubmit={onSubmit}>
      <div className="space-y-6">
        <ProductDetailHeader />

        <form className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <ProductAttributes />
            <ProductPricing />
            <ProductDescription />
          </div>

          <div className="flex flex-col space-y-6">
            <ProductInventory />
          </div>
        </form>
      </div>
    </EditFormLayout>
  );
};

export default ProductDetail;
