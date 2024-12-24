import { ArrowLeft, Copy, ExternalLink, Info, MoreHorizontal, Printer } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';

const OrderDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/orders")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">
              #2 Estefano Sebastian Bran Zapata
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="whatsapp">
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline">Edit</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Status Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select defaultValue="pending">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment status</Label>
                    <Select defaultValue="unpaid">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Payment link</Label>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Input value="https://take.app/floresjuan" readOnly />
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Internal note</Label>
                  <Textarea placeholder="Add a note (invisible to customers)" />
                </div>

                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <p className="text-muted-foreground">
                    Drag a file here or click to select one
                  </p>
                  <p className="text-sm text-muted-foreground">
                    File should not exceed 10mb. Recommended ratio is 1:1.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Items</h3>
                    <p className="text-sm text-muted-foreground">1 item</p>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-4">
                      <span>1x</span>
                      <span>Girasol</span>
                    </div>
                    <span>S/ 3.00</span>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Items total (1)</span>
                      <span>S/ 3.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>S/ 3.00</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>S/ 3.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Customer</h3>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm text-muted-foreground">Name</span>
                      <span className="col-span-2">
                        Estefano Sebastian Bran Zapata
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm text-muted-foreground">Phone</span>
                      <span className="col-span-2">51987961985</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Order history</h3>
                  <div className="space-y-4">
                    <div className="grid gap-1">
                      <p className="text-sm">
                        PEN 3.00 payment (Cash on Delivery) in Unpaid
                      </p>
                      <p className="text-xs text-muted-foreground">
                        28 Nov 2024 23:29
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm">Order created</p>
                      <p className="text-xs text-muted-foreground">
                        28 Nov 2024 23:26
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Staff</h3>
                  <div className="space-y-2">
                    <p className="text-sm">Upgrade to assign staff</p>
                    <Button variant="default" size="sm" className="w-full">
                      Upgrade to Business
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="w-full text-muted-foreground"
                    >
                      Learn more
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
