import useGetAllProductsQuery from "@/api/queries/useGetAllProductsQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateOrderItemDto } from "@/types/orders";
import { Product } from "@/types/products";
import { FC, useState } from "react";

interface ProductCardProps {
  product: Product;
  handleAddProduct: (product: CreateOrderItemDto) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, handleAddProduct }) => {
  return (
    <div
      key={product.id}
      className="p-4 border rounded-md"
      onClick={() =>
        handleAddProduct({
          productId: product.id,
          productName: product.name,
          quantity: 1,
          price: product.price,
        })
      }
    >
      <h3 className="text-sm font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">S/{product.price}</p>
    </div>
  );
};

interface AddProductDialogProps {
  appendProduct: (product: CreateOrderItemDto) => void;
}

const AddProductDialog: FC<AddProductDialogProps> = ({ appendProduct }) => {
  const [open, setOpen] = useState(false);
  const { data: products, isPending } = useGetAllProductsQuery();

  const handleAddProduct = (product: CreateOrderItemDto) => {
    appendProduct(product);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Añadir producto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir producto</DialogTitle>
        </DialogHeader>
        {isPending || !products ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">Cargando...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id + product.name}
                product={product}
                handleAddProduct={handleAddProduct}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
