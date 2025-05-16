import WhatsAppSvg from "@/components/common/WhatsappSvg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HomeIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ProductItem from "./components/productItem"

const CheckoutPage = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [items] = useState([
    { id: 1, name: 'Hamburguesa', price: 5, quantity: 2, image: 'https://via.placeholder.com/64' },
    { id: 2, name: 'Papas Fritas', price: 2, quantity: 1, image: 'https://via.placeholder.com/64' },
  ])
  const navigate = useNavigate();
  const commerceNumber = '935577713';

  const getTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  const handleWhatsAppOrder = () => {
    const message = `Hola, quiero realizar un pedido:\n\n` +
      items.map(item => `- ${item.name} x${item.quantity}`).join('\n') +
      `\n\nTotal: $${getTotalPrice().toFixed(2)}\n\n` +
      `Nombre: ${name}\nTeléfono: ${phone}`

    const whatsappUrl = `https://wa.me/${commerceNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="container max-w-screen-md mx-auto p-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-lg mr-auto">Flores Juan</h2>
        <Button variant="ghost" onClick={() => { navigate('/store') }}>
          <HomeIcon size={16} /> Volver
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Formulario de Información */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Información de Contacto</h2>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              placeholder="Ingresa tu Nombre Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="whatsappNumber">Número de WhatsApp</Label>
            <div className="flex">
              <div className="mr-2">
                <Select defaultValue="+51" name="country-code">
                  <SelectTrigger className="border rounded-lg px-4 py-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+51">+51</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Ingrese su número de WhatsApp"
                  name="whatsappNumber"
                  id="whatsappNumber"
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resumen de Pedido */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Resumen de Pedido</h2>
          {items.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>

          <Button
            className="w-full mt-4"
            onClick={handleWhatsAppOrder}
            disabled={!name || !phone || items.length === 0}
          >
            <WhatsAppSvg /> Enviar Pedido por WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage;
