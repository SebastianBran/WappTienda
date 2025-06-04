import { FC } from "react";
import { Button } from "../ui/button";
import { Save, Trash } from "lucide-react";

type SaveChangesToolbarProps = {
  onReset: () => void;
  onSave: () => void;
};

const SaveChangesToolbar: FC<SaveChangesToolbarProps> = ({
  onReset,
  onSave,
}) => {
  return (
    <div className="bg-gray-300 border-b w-full px-4">
      <div className="container mx-auto py-3 flex items-center gap-4">
        <span className="text-sm font-medium">Cambios sin guardar</span>
        <Button variant="secondary" onClick={onReset} className="gap-2 ml-auto">
          <Trash className="h-4 w-4" /> Descartar
        </Button>
        <Button onClick={onSave} className="gap-2">
          <Save className="h-4 w-4" /> Guardar
        </Button>
      </div>
    </div>
  );
};

export default SaveChangesToolbar;
