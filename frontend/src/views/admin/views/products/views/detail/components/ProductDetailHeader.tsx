import useDeleteProductMutation from "@/api/mutations/useDeleteProductMutation";
import DeleteElementDialog from "@/components/common/DeleteElementDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailHeader: FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { mutate: deleteProductMutate } = useDeleteProductMutation();

  const handleDelete = () => {
    deleteProductMutate(
      { id: Number(productId) },
      {
        onSuccess: () => {
          navigate("/admin/products");
        },
      },
    );
  };

  return (
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
            Producto #{Number(productId)}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DeleteElementDialog
              title="Eliminar producto"
              description="¿Estás seguro de que deseas eliminar este producto?"
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Eliminar
                </DropdownMenuItem>
              }
              onDelete={handleDelete}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProductDetailHeader;
