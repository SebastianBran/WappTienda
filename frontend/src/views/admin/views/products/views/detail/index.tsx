import { useParams } from "react-router-dom";
import {
  ProductInventory,
  ProductDescription,
  ProductPricing,
  ProductAttributes,
} from "@/views/admin/views/products/components";
import { useFormContext } from "react-hook-form";
import { UpdateProductSchema } from "@/schemas/updateProduct.schema";
import { cn } from "@/lib/utils";
import useUpdateProductMutation from "@/api/mutations/useUpdateProductMutation";
import SaveChangesToolbar from "@/components/common/SaveChangesToolbar";
import { ProductDetailHeader } from "./components";

const ProductDetail = () => {
  const { productId } = useParams();
  const { mutate: updateProductMutate } = useUpdateProductMutation();
  const form = useFormContext<UpdateProductSchema>();
  const { handleSubmit, reset, formState } = form;
  const isFormChanged = formState.isDirty;

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
    <>
      {isFormChanged && <SaveChangesToolbar form={form} onSubmit={onSubmit} />}
      <div className={cn("container mx-auto py-6", isFormChanged && "pt-16")}>
        <div className="space-y-6">
          <ProductDetailHeader />

          <form
            className="grid gap-6 md:grid-cols-3"
            onSubmit={handleSubmit(onSubmit)}
          >
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
      </div>
    </>
  );
};

export default ProductDetail;
