import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/products";
import { FC } from "react";

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Descripción</h2>
        <Textarea className="min-h-[150px]" value={product.description} />
      </CardContent>
    </Card>
  );
};

export default ProductDescription;
