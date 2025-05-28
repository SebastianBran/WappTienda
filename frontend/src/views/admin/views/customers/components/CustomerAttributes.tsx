import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const CustomerAttributes: FC = () => {
  const { control } = useFormContext();

  const formatUTCDate = (date: string): string => {
    const utcDate = new Date(date);

    const year = utcDate.getUTCFullYear();
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(utcDate.getUTCDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  const getSelectedDate = (date?: string) => {
    if (!date) {
      return new Date();
    }

    const utcDate = new Date(date);

    const year = utcDate.getUTCFullYear();
    const month = utcDate.getUTCMonth();
    const day = utcDate.getUTCDate();

    return new Date(year, month, day);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">
                Nombre<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input id="name" {...field} required />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone">
                Teléfono<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input id="phone" type="tel" {...field} required />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  {...field}
                  placeholder="Correo eletrónico del cliente"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de cumpleaños</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      {field.value ? (
                        formatUTCDate(field.value)
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={getSelectedDate(field.value)}
                    defaultMonth={getSelectedDate(field.value)}
                    onSelect={(date) => {
                      field.onChange(date?.toISOString());
                    }}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toDate={new Date()}
                    locale={es}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="notes">Notas</FormLabel>
              <FormControl>
                <Textarea
                  id="notes"
                  placeholder="Agregar notas sobre el cliente"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CustomerAttributes;
