import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import useGetAllProductsQuery from "@/api/queries/useGetAllProductsQuery";
import ViewLoading from "@/components/common/ViewLoading";

const Products = () => {
  const navigate = useNavigate();
  const { data: products, isPending } = useGetAllProductsQuery();

  if (isPending) {
    return <ViewLoading />;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Productos</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/admin/products/create")}>Añadir producto</Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow
                key={product.id + product.name}
                onClick={() => navigate(`/admin/products/${product.id}/detail`)}
              >
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://via.placeholder.com/48"
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        S/ {product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${
                      product.visible
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.visible ? "VISIBLE" : "OCULTO"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* TODO: Implement pagination */}
      {/* <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">Total 2</div>
        <div className="flex items-center gap-2">
          <Select defaultValue="50">
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" disabled>
            {"<"}
          </Button>
          <Button variant="outline" size="icon" disabled>
            {">"}
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default Products;
