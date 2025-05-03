import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

const Orders = () => {
  const navigate = useNavigate();
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Órdenes</h1>
        </div>
        <div className="flex gap-2">
          <Button>Crear orden</Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Orden</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow onClick={() => navigate("/admin/orders/2/detail")}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">#2</div>
                  <div className="text-sm text-muted-foreground">
                    Estefano Sebastian Bran Zapata
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  28 Nov 2024 23:26
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Badge variant="secondary">PENDIENTE</Badge>
                  <Badge variant="secondary">NO PAGADO</Badge>
                  <Badge variant="secondary">NO CUMPLIDO</Badge>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Total 1
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
};

export default Orders;
