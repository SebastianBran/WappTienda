import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
}

interface ProductCardProps {
  product: Product;
  setSelectedProduct: (product: Product) => void;
}

const ProductCard = ({ product, setSelectedProduct } : ProductCardProps) => {
  return (
    <Card
      key={product.id}
      onClick={() => setSelectedProduct(product)}
      className="cursor-pointer hover:shadow-lg transition-shadow w-fit"
    >
      <img src="https://via.placeholder.com/200" alt={product.name} className="rounded-t-lg" />
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>S/ {product.price}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
