import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const products = [
  { id: 1, name: 'Product 1', stock: 10, price: 100 },
  { id: 2, name: 'Product 2', stock: 5, price: 200 },
  { id: 3, name: 'Product 3', stock: 15, price: 300 },
];

const Admin = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input
              placeholder="Product Name"
            />

            <Input
              placeholder="Price"
              type="number"
            />

            <Input
              placeholder="Stock"
              type="number"
            />

            <Button type="submit" className="w-full">Add Product</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Current Products</h2>
        {products.map((product) => (
          <div key={product.id} className="border p-3 mb-2 flex justify-between">
            <span>{product.name}</span>
            <span>Stock: {product.stock}</span>
            <span>Price: ${product.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin;
