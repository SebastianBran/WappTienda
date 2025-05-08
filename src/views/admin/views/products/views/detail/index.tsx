import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  ProductInventory,
  ProductDescription,
  ProductPricing,
  ProductAttributes,
} from "./components";
import ViewLoading from "@/components/common/ViewLoading";
import { useContext, useEffect, useState } from "react";
import { ProductDetailContext } from "./ProductDetailContext";
import { useFormContext } from "react-hook-form";
import { UpdateProductSchema } from "@/schemas/updateProduct.schema";
import { cn } from "@/lib/utils";
import useUpdateProductMutation from "@/api/mutations/useUpdateProductMutation";
import SaveChangesToolbar from "@/components/common/SaveChangesToolbar";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const { product, isPending } = useContext(ProductDetailContext);
  const { mutate } = useUpdateProductMutation();
  const form = useFormContext<UpdateProductSchema>();

  useEffect(() => {
    if (form.formState.isDirty) {
      setIsFormChanged(true);
    } else {
      setIsFormChanged(false);
    }
  }, [form.formState.isDirty]);

  const onSubmit = (data: UpdateProductSchema) => {
    if (product) {
      mutate(
        { id: product.id, data },
        {
          onSuccess: () => {
            form.reset(data);
            setIsFormChanged(false);
          },
        },
      );
    }
  };

  if (isPending || !product) {
    return <ViewLoading />;
  }

  // TODO: Implement a error view if the product is not found

  return (
    <>
      {isFormChanged && <SaveChangesToolbar form={form} onSubmit={onSubmit} />}
      <div className={cn("container mx-auto py-6", isFormChanged && "pt-16")}>
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
                <h1 className="text-xl font-semibold">
                  Producto #{product.id}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Eliminar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <form
            className="grid gap-6 md:grid-cols-3"
            onSubmit={form.handleSubmit(onSubmit)}
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
