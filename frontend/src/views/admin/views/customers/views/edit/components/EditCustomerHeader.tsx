import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomerHeader: FC = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            navigate(`/admin/customers/${Number(customerId)}/detail`)
          }
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Cliente</h1>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerHeader;
