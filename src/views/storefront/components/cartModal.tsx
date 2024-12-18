import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartButtonTrigger from "./cartButtonTrigger";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const CartModal = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: "Producto 1", quantity: 1, price: 10 },
    { id: 2, name: "Producto 2", quantity: 2, price: 20 },
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity }
      }

      return item
    }))
  }

  const removeFromCart = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  return (
    <Sheet>
      <SheetTrigger>
        <CartButtonTrigger />
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p>{item.name}</p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </div>
            ))}

            <div className="mt-auto">
              <p className="font-bold">Total: ${getTotalPrice().toFixed(2)}</p>
              <Button className="w-full mt-2" onClick={() => { navigate('/checkout') }}>
                Ir a Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default CartModal;
