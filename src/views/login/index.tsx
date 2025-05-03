import HeaderBrandButton from "@/components/common/HeaderBrandButton";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="justify-center items-center min-h-screen grid grid-cols-2">
      <div className="absolute top-0 left-0 ml-4 mt-4">
        <HeaderBrandButton />
      </div>

      <div className="flex flex-col w-full items-center my-auto">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>Introduce tus credenciales</CardDescription>
        </CardHeader>

        <LoginForm />
      </div>

      <div className="flex h-full w-full bg-gray-100"></div>
    </div>
  );
};

export default LoginPage;
