import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CartFloatingButton from "./components/cartFloatingButton";
import { useState } from "react";
import ProductDetailModal from "./components/productDetailModal";

interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
}

const products = [
  {
    id: 1,
    name: "Red Roses",
    stock: 10,
    price: 100,
  },
  {
    id: 2,
    name: "White Roses",
    stock: 5,
    price: 200,
  },
  {
    id: 3,
    name: "Pink Roses",
    stock: 15,
    price: 300,
  },
  {
    id: 4,
    name: "Yellow Roses",
    stock: 20,
    price: 400,
  },
];

const Storefront = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Flores juan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>Price: ${product.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CartFloatingButton />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

export default Storefront;
