import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingItem } from "@/types/setting";
import settingsService from "../services/settings.service";
import { toast } from "@/hooks/use-toast";

const useUpdateSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: Partial<SettingItem>[] }) =>
      settingsService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Exitoso",
        description: "Configuraciones actualizadas con éxito",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error updating setting", error);
    },
  });
};

export default useUpdateSettingsMutation;
