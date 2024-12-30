import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartButtonTrigger from "./cartButtonTrigger";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import QuantitySelector from "@/components/common/quantitySelector";

const CartModal = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: "Producto 1", quantity: 1, price: 10, image: "https://via.placeholder.com/80" },
    { id: 2, name: "Producto 2", quantity: 2, price: 20, image: "https://via.placeholder.com/80" },
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
              <div key={item.id} className="flex border-b py-2">
                <div>
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                </div>
                <div className="ml-4 mr-auto justify-between flex flex-col h-20">
                  <p>{item.name}</p>
                  <p className="text-gray-500">S/ {item.price}</p>
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(quantity) => updateQuantity(item.id, quantity)}
                  />
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
              <Button className="w-full mt-2" onClick={() => { navigate('checkout') }}>
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
