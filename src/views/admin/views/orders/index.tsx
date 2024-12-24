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

const Orders = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Orders</h1>
        </div>
        <div className="flex gap-2">
          <Button>Create order</Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
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
                  <Badge variant="secondary">PENDING</Badge>
                  <Badge variant="secondary">UNPAID</Badge>
                  <Badge variant="secondary">UNFULFILLED</Badge>
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
