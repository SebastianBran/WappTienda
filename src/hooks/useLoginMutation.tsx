import { setItem } from "@/lib/local-storage";
import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: ({ data }) => {
      setItem<string>("token", data.access_token);
    },
  });
};

export default useLoginMutation;
