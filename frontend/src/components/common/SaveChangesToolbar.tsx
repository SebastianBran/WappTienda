/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Button } from "../ui/button";
import { Save, Trash } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type SaveChangesToolbarProps = {
  onSubmit: (data: any) => void;
  form: UseFormReturn<any, any, any>;
};

const SaveChangesToolbar: FC<SaveChangesToolbarProps> = ({
  form,
  onSubmit,
}) => {
  return (
    <div className="absolute top-0 left-0 bg-gray-300 border-b w-full px-4">
      <div className="container mx-auto py-3 flex items-center gap-4">
        <span className="text-sm font-medium">Cambios sin guardar</span>
        <Button
          variant="secondary"
          onClick={() => form.reset()}
          className="gap-2 ml-auto"
        >
          <Trash className="h-4 w-4" /> Descartar
        </Button>
        <Button onClick={() => form.handleSubmit(onSubmit)()} className="gap-2">
          <Save className="h-4 w-4" /> Guardar
        </Button>
      </div>
    </div>
  );
};

export default SaveChangesToolbar;
