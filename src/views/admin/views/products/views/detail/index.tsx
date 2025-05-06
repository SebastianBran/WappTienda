import { ArrowLeft, MoreHorizontal } from "lucide-react";
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
import { useContext } from "react";
import { ProductDetailContext } from "./ProductDetailContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { product, isPending } = useContext(ProductDetailContext);

  if (isPending || !product) {
    return <ViewLoading />;
  }

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
              <h1 className="text-xl font-semibold">Producto #{product.id}</h1>
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

        <form className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <ProductAttributes product={product} />
            <ProductPricing product={product} />
            <ProductDescription product={product} />
          </div>

          <div className="flex flex-col space-y-6">
            <ProductInventory product={product} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
