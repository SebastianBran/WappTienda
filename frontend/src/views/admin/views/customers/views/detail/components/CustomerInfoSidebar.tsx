import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerDetailContext from "../CustomerDetailContext";

const CustomerInfoSidebar: FC = () => {
  const navigate = useNavigate();
  const { customer } = useContext(CustomerDetailContext);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(customer.phone);
    setShowCopyTooltip(true);
    setTimeout(() => {
      setShowCopyTooltip(false);
    }, 2000);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Información del cliente</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/customers/${customer.id}/edit`)}
          >
            Editar
          </Button>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Teléfono</p>
            <div className="flex items-center gap-2">
              <p className="text-blue-500">{customer.phone}</p>
              <TooltipProvider>
                <Tooltip open={showCopyTooltip}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={handleCopyPhone}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-black border border-gray-300 rounded-md shadow-md p-2">
                    ¡Copiado al portapapeles!
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoSidebar;
