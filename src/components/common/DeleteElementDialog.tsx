import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface DeleteElementDialogProps {
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onDelete: () => void;
  trigger: React.ReactNode;
}

const DeleteElementDialog: FC<DeleteElementDialogProps> = ({
  title = "Eliminar elemento",
  description = "¿Estás seguro de que deseas eliminar este elemento?",
  cancelText = "Cancelar",
  confirmText = "Eliminar",
  trigger,
  onDelete,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteElementDialog;
