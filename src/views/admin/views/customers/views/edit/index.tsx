import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CustomerEdit = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();

  return (
    <div className="container max-w-2xl mx-auto py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/customers/1/detail')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Cliente</h1>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nombre<span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                defaultValue="Estefano Sebastian Bran Zapata"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Teléfono<span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Select defaultValue="+51">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Código" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+51">+51</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="987961985"
                  required
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Correo del cliente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Cumpleaños</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {date ? format(date, "PPP") : "Cumpleaños"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                placeholder="Agregar notas sobre el cliente"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            Guardar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CustomerEdit;
