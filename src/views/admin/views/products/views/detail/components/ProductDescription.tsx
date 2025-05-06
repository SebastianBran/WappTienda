import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";

interface ProductDescriptionProps {}

const ProductDescription: FC<ProductDescriptionProps> = () => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Descripción</h2>
        <Textarea className="min-h-[150px]" />
      </CardContent>
    </Card>
  );
};

export default ProductDescription;
