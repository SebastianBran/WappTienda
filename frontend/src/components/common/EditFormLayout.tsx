import { PropsWithChildren } from "react";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import SaveChangesToolbar from "./SaveChangesToolbar";
import { cn } from "@/lib/utils";

type EditFormLayoutProps<T extends FieldValues> = PropsWithChildren & {
  onSubmit: SubmitHandler<T>;
};

const EditFormLayout = <T extends FieldValues>({
  children,
  onSubmit,
}: EditFormLayoutProps<T>) => {
  const form = useFormContext<T>();
  const { handleSubmit, reset, formState } = form;
  const isFormChanged = formState.isDirty;

  return (
    <>
      {isFormChanged && (
        <SaveChangesToolbar
          onReset={() => reset()}
          onSave={handleSubmit(onSubmit)}
        />
      )}
      <div
        className={cn(
          "container mx-auto py-6",
          isFormChanged && "pt-16",
        )}
      >
        {children}
      </div>
    </>
  );
};

export default EditFormLayout;
