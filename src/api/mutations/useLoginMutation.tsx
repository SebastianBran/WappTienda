import { setItem } from "@/lib/local-storage";
import authService from "@/api/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const useLoginMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: ({ data }) => {
      setItem<string>("access_token", data.access_token);
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
