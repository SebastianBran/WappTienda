import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useForm } from "react-hook-form";
import loginSchema, { LoginFormType } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useLoginMutation from "@/api/mutations/useLoginMutation";
import Spinner from "@/components/common/Spinner";

const loginFormDefaultValues = {
  username: "",
  password: "",
};

const LoginForm: FC = () => {
  const { mutate, isPending } = useLoginMutation();
  const form = useForm<LoginFormType>({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormType) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Contraseña" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Spinner />}
          Iniciar Sesión
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
