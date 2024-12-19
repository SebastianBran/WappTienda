interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product } : ProductItemProps) => {
  return (
    <div key={product.id} className="flex items-center border-b py-2">
      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
      <span className="ml-4 mr-auto">{product.name} x {product.quantity}</span>
      <span>S/ {(product.price * product.quantity).toFixed(2)}</span>
    </div>
  );
};

export default ProductItem;
