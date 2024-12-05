import WhatsAppSvg from "@/assets/whatsappSvg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const CheckoutPage = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [items] = useState([
    { id: 1, name: 'Hamburguesa', price: 5, quantity: 2 },
    { id: 2, name: 'Papas Fritas', price: 2, quantity: 1 },
  ])
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      
      <div className="flex flex-col gap-4">
        {/* Formulario de Información */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Información de Contacto</h2>
          <Input 
            placeholder="Nombre Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-2"
          />
          <Input 
            placeholder="Número de Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-4"
          />
        </div>
        
        {/* Resumen de Pedido */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Resumen de Pedido</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
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
