import { useState } from "react";
import ProductDetailModal from "./components/productDetailModal";
import { useParams } from "react-router-dom";
import ProductCard from "./components/productCard";
import CartModal from "./components/cartModal";

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
  const { storeName } = useParams(); // TODO: Use storeName to fetch products from the API
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="container mx-auto p-4">
      <div className="container border-b mb-8">
        <h1 className="text-3xl text-center font-bold mb-6">Flores juan</h1>
        <img src="https://via.placeholder.com/100" alt="Store logo" className="mx-auto rounded-full mb-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 max-w-screen-md gap-4 justify-items-center mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} setSelectedProduct={setSelectedProduct} />
        ))}
      </div>

      <CartModal />

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
