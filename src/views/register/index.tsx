import HeaderBrandButton from "@/components/common/headerBrandButton"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const navigate = useNavigate()

  const onSubmit = () => {
    // Simulate registration (replace with actual registration)
    navigate('/create-store')
  }

  return (
    <div className="justify-center items-center min-h-screen grid grid-cols-2">
      <div className="absolute top-0 left-0 ml-4 mt-4">
        <HeaderBrandButton />
      </div>

      <div className="flex flex-col w-full items-center my-auto">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl">Registrarse</CardTitle>
          <CardDescription>Crea una nueva cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={() => { onSubmit() }} className="space-y-4">
            <Input
              placeholder="Correo electrónico"
              type="email"
            />

            <Input
              placeholder="Contraseña"
              type="password"
            />

            <Input
              placeholder="Confirmar Contraseña"
              type="password"
            />

            <Button type="submit" className="w-full">Registrarse</Button>

            <p>¿Ya tienes una cuenta?
              <Button
                variant="link"
                onClick={() => navigate('/login')}
              >
                Iniciar sesión
              </Button>
            </p>
          </form>
        </CardContent>
      </div>

      <div className="flex h-full w-full bg-gray-100"></div>
    </div>
  )
}

export default RegisterPage;
