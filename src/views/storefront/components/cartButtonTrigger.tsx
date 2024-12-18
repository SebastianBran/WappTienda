import { Button } from "@/components/ui/button";

const CartButtonTrigger = () => {
  const totalItems = 2;

  return (
    <>
      <Button 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <span className="rounded-full bg-white w-fit px-2 text-[#16a34a]">
          {totalItems}
        </span>

        <span className="mx-8">
          Carrito
        </span> 

        <span>
          S/ 20000
        </span>
      </Button>
    </>
  )
}

export default CartButtonTrigger;
