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

const GeneralSettingsSocialNetworks: FC = () => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redes Sociales</CardTitle>
        <CardDescription>Conecta tus cuentas de redes sociales</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <FormField
          control={control}
          name="facebookProfile"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="facebookProfile">Facebook</FormLabel>
              <FormControl>
                <Input
                  id="facebookProfile"
                  placeholder="URL del perfil de Facebook"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="instagramProfile"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="instagramProfile">Instagram</FormLabel>
              <FormControl>
                <Input
                  id="instagramProfile"
                  placeholder="URL del perfil de Instagram"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="tiktokProfile"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="tiktokProfile">TikTok</FormLabel>
              <FormControl>
                <Input
                  id="tiktokProfile"
                  placeholder="URL del perfil de TikTok"
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

export default GeneralSettingsSocialNetworks;
