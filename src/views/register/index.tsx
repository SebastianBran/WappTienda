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
      <HeaderBrandButton />

      <div className="flex flex-col w-full items-center my-auto">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={() => { onSubmit() }} className="space-y-4">
            <Input
              placeholder="Email"
              type="email"
            />

            <Input
              placeholder="Password"
              type="password"
            />

            <Input
              placeholder="Confirm Password"
              type="password"
            />

            <Button type="submit" className="w-full">Register</Button>

            <p>Already have an account?
              <Button
                variant="link"
                onClick={() => navigate('/login')}
              >
                Login
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
