import HeaderBrandButton from "@/components/common/HeaderBrandButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <HeaderBrandButton className="text-xl" />
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/login")}>Iniciar sesión</Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
