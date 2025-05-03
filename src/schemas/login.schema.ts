import { z } from "zod";

const loginSchema = z.object({
  username: z.string().nonempty("El nombre de usuario es requerido"),
  password: z.string().nonempty("La contraseña es requerida"),
});

export type LoginFormType = z.infer<typeof loginSchema>;

export default loginSchema;
