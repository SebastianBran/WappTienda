import HeaderBrandButton from "@/components/common/headerBrandButton"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const navigate = useNavigate()

  const onSubmit = () => {
    // Simulate login (replace with actual authentication)
    navigate('/admin')
  }

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

        <CardContent>
          <form onSubmit={() => { onSubmit() }} className="space-y-4">
            <Input
              placeholder="Correo Electrónico"
              type="email"
            />

            <Input
              placeholder="Contraseña"
              type="password"
            />

            <Button type="submit" className="w-full">Iniciar Sesión</Button>

            <p>¿No tienes una cuenta?
              <Button
                variant="link"
                onClick={() => navigate('/register')}
              >
                Regístrate
              </Button>
            </p>
          </form>
        </CardContent>
      </div>

      <div className="flex h-full w-full bg-gray-100"></div>
    </div>
  )
}

export default LoginPage;