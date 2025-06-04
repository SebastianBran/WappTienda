import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const GeneralSettingsWhatsapp: FC = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de WhatsApp</CardTitle>
        <CardDescription>
          Configura los ajustes de tu WhatsApp Business
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <FormField
          control={control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="whatsappNumber">Número de Whatsapp</FormLabel>
              <FormControl>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  placeholder="Ingrese número de Whatsapp de la tienda"
                  {...field}
                  required
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default GeneralSettingsWhatsapp;
