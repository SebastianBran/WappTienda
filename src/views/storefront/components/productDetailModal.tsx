import QuantitySelector from "@/components/common/quantitySelector";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface Product {
  name: string;
  price: number;
  stock: number;
}

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-fit">
        <img src="https://via.placeholder.com/300" alt={product.name} className="rounded-lg mt-4" />

        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Precio: S/ {product.price}
          </DialogDescription>
        </DialogHeader>

        <div className="flex border-t border-b py-4">
          <span className="font-bold">
            Cantidad
          </span>

          <QuantitySelector
            quantity={quantity}
            max={product.stock}
            onChange={setQuantity}
            className="ml-auto"
          />
        </div>


        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2" /> Agregar al Carrito
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailModal;
