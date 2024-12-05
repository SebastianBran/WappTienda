import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const CreateStore = () => {
  const navigate = useNavigate()

  const onSubmit = () => {
    navigate('/admin')
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Setup Your Store</CardTitle>
          <CardDescription>Provide your store details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={() => { onSubmit() }} className="space-y-4">
            <Input
              placeholder="Store Name"
            />

            <Input
              placeholder="Phone Number"
              type="tel"
            />

            <Button type="submit" className="w-full">Setup Store</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateStore;