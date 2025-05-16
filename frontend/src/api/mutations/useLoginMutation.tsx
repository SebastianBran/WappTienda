import { setItem } from "@/lib/local-storage";
import authService from "@/api/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoginFormType } from "@/schemas/login.schema";

const useLoginMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: LoginFormType) =>
      authService.login(data.username, data.password),
    onSuccess: (data) => {
      setItem<string>("accessToken", data.access_token);
      navigate("/admin");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Credenciales incorrectas",
        variant: "destructive",
      });
    },
  });
};

export default useLoginMutation;
