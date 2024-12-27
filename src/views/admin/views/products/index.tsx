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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Productos</h1>
        </div>
        <div className="flex gap-2">
          <Button>Añadir producto</Button>
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
            <TableRow onClick={() => navigate('/admin/products/1/detail')}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/48"
                    alt="Girasol"
                    width={48}
                    height={48}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">Rosa</div>
                    <div className="text-sm text-muted-foreground">S/ 5.00</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  VISIBLE
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow onClick={() => navigate('/admin/products/2/detail')}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/48"
                    alt="Girasol"
                    width={48}
                    height={48}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">Girasol</div>
                    <div className="text-sm text-muted-foreground">S/ 3.00</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  VISIBLE
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Total 2
        </div>
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
      </div>
    </div>
  )
}

export default Products;
