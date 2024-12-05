import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const navigate = useNavigate()

  const onSubmit = () => {
    // Simulate login (replace with actual authentication)
    navigate('/create-store')
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
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
            
            <Button type="submit" className="w-full">Login</Button>
            
            <p>Don't have an account? 
              <Button 
                variant="link" 
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage;