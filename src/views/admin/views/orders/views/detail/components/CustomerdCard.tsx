import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Customer } from "@/types/customers";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface CustomerCardProps {
  customer: Customer;
}

const CustomerdCard: FC<CustomerCardProps> = ({ customer }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Cliente</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                navigate(`/admin/customers/${customer.id}/detail`)
              }
            >
              Ver
            </Button>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-sm text-muted-foreground">Nombre</span>
              <span className="col-span-2">{customer.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-sm text-muted-foreground">Teléfono</span>
              <span className="col-span-2">{customer.phone}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerdCard;
