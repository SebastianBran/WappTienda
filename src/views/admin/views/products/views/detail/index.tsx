import { ArrowLeft, MoreHorizontal, Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import ProductInventory from "./components/ProductInventory";
import ProductDescription from "./components/ProductDescription";
import ProductPricing from "./components/ProductPricing";
import ProductAttributes from "./components/ProductAttributes";
import ViewLoading from "@/components/common/ViewLoading";
import { useContext, useEffect, useState } from "react";
import { ProductDetailContext } from "./ProductDetailContext";
import { useFormContext } from "react-hook-form";
import { UpdateProductSchema } from "@/schemas/updateProduct.schema";
import { cn } from "@/lib/utils";
import useUpdateProductMutation from "@/api/mutations/useUpdateProductMutation";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const { product, isPending } = useContext(ProductDetailContext);
  const { mutate } = useUpdateProductMutation();
  const form = useFormContext<UpdateProductSchema>();

  useEffect(() => {
    if (form.formState.isDirty) {
      setIsFormChanged(true);
    }
  }, [form.formState]);

  const onSubmit = (data: UpdateProductSchema) => {
    if (product) {
      mutate({ id: product.id, data }, {
        onSuccess: () => {
          form.reset(data);
          setIsFormChanged(false);
        },
      });
    }
  };

  if (isPending || !product) {
    return <ViewLoading />;
  }

  return (
    <>
      {isFormChanged && (
        <div className="absolute top-0 left-0 bg-gray-300 border-b w-full px-4">
          <div className="container mx-auto py-3 flex items-center gap-4">
            <span className="text-sm font-medium">Cambios sin guardar</span>
            <Button
              variant="secondary"
              onClick={() => {
                form.reset();
                setIsFormChanged(false);
              }}
              className="gap-2 ml-auto"
            >
              <Trash className="h-4 w-4" /> Descartar
            </Button>
            <Button
              onClick={() => form.handleSubmit(onSubmit)()}
              className="gap-2"
            >
              <Save className="h-4 w-4" /> Guardar
            </Button>
          </div>
        </div>
      )}
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
