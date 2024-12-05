import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartModal from "./cartModal";

const CartFloatingButton = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const totalItems = 2;

  return (
    <>
      <Button 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="mr-2" /> 
        Carrito ({totalItems})
      </Button>
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  )
}

export default CartFloatingButton;
