import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"

interface HeaderBrandButtonProps {
  className?: string;
}

const HeaderBrandButton = ({ className }: HeaderBrandButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      className={cn(
        "font-bold text-2xl hover:bg-unset",
        className,
      )}
      variant="ghost"
      onClick={() => navigate('/home')}
    >
      WappTienda
    </Button>
  )
}

export default HeaderBrandButton;