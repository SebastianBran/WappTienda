import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUpdateCustomerMutation from "@/api/mutations/useUpdateCustomerMutation";
import { useForm } from "react-hook-form";
import useGetCustomerByIdQuery from "@/api/queries/useGetCustomerByIdQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import updateCustomerSchema, {
  UpdateCustomerSchema,
} from "@/schemas/updateCustomer.schema";
import ViewLoading from "@/components/common/ViewLoading";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import SaveChangesToolbar from "@/components/common/SaveChangesToolbar";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";

const CustomerEdit = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { data: customer, isPending } = useGetCustomerByIdQuery(
    Number(customerId || 0),
  );
  const { mutate: updateCustomerMutate } = useUpdateCustomerMutation();
  const form = useForm({
    defaultValues: {
      name: customer?.name || "",
      phone: customer?.phone || "",
      email: customer?.email || "",
      birthDate: customer?.birthDate || "",
      notes: customer?.notes || "",
    },
    resolver: zodResolver(updateCustomerSchema),
  });
  const isFormChanged = form.formState.isDirty;

  useEffect(() => {
    if (customer) {
      form.reset({
        name: customer.name,
        phone: customer.phone,
        email: customer.email || undefined,
        birthDate: customer.birthDate || undefined,
        notes: customer.notes || undefined,
      });
    }
  }, [customer, form]);

  if (isPending || !customer) {
    return <ViewLoading />;
  }

  const onSubmit = (data: UpdateCustomerSchema) => {
    updateCustomerMutate(
      { id: customer.id, data },
      {
        onSuccess: () => {
          form.reset(data);
        },
      },
    );
  };

  const formatUTCDate = (date: string): string => {
    const utcDate = new Date(date);

    const year = utcDate.getUTCFullYear();
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(utcDate.getUTCDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  const getSelectedDate = (date: string) => {
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
    <>
      {isFormChanged && <SaveChangesToolbar form={form} onSubmit={onSubmit} />}
      <div className={cn("container mx-auto py-6", isFormChanged && "pt-16")}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  navigate(`/admin/customers/${customer.id}/detail`)
                }
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">Cliente</h1>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">
                          Correo electrónico
                        </FormLabel>
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
                    control={form.control}
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
                    control={form.control}
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
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CustomerEdit;
