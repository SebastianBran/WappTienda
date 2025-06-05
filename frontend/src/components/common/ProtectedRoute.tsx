import { getItem } from "@/lib/local-storage";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getItem<string>("accessToken");
    if (!accessToken) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
