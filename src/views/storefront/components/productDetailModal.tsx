import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Minus, Plus, ShoppingCart } from "lucide-react";
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Price: {product.price}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus />
          </Button>

          <span className="text-2xl">{quantity}</span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          >
            <Plus />
          </Button>
        </div>

        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2" /> Agregar al Carrito
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailModal;
