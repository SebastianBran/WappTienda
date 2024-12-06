import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const HeaderBrandButton = () => {
  const navigate = useNavigate();
  
  return (
    <div className="absolute top-0 left-0 ml-4 mt-4">
      <Button
        className="font-bold text-2xl hover:bg-unset"
        variant="ghost"
        onClick={() => navigate('/home')}
      >
        WappTienda
      </Button>
    </div>
  )
}

export default HeaderBrandButton;