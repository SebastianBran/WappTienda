import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ProductAttributes,
  ProductDescription,
  ProductInventory,
  ProductPricing,
} from "@/views/admin/views/products/components";
import useCreateProductMutation from "@/api/mutations/useCreateProductMutation";
import { useFormContext } from "react-hook-form";
import Spinner from "@/components/common/Spinner";
import { CreateProductSchema } from "@/schemas/createProduct.schema";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { mutate: createProductMutate, isPending } = useCreateProductMutation();
  const { reset, handleSubmit } = useFormContext<CreateProductSchema>();

  const onSubmit = (data: CreateProductSchema) => {
    createProductMutate(
      { data },
      {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          console.error("Error creating product", error);
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
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <ProductAttributes />
              <ProductPricing />
              <ProductDescription />
            </div>

            <div className="flex flex-col space-y-6">
              <ProductInventory />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : "Crear producto"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
