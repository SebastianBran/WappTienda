import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const GeneralSettingProfile: FC = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <FormField
          control={control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="storeName">Nombre</FormLabel>
              <FormControl>
                <Input
                  id="storeName"
                  placeholder="Ingrese el nombre de la tienda"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default GeneralSettingProfile;
