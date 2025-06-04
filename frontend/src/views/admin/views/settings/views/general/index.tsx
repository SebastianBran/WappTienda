import useUpdateSettingsMutation from "@/api/mutations/useUpdateSettingsMutation";
import EditFormLayout from "@/components/common/EditFormLayout";
import { UpdateGeneralSettingsSchema } from "@/schemas/updateGeneralSettings.schema";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { transforGeneralSettingsToSettings } from "../utils/settings.utils";
import {
  GeneralSettingsProfile,
  GeneralSettingsWhatsapp,
  GeneralSettingsSocialNetworks,
} from "./components";

const GeneralSettings: FC = () => {
  const { mutate: updateSettingsMutate } = useUpdateSettingsMutation();
  const form = useFormContext<UpdateGeneralSettingsSchema>();
  const { reset } = form;

  const onSubmit = (data: UpdateGeneralSettingsSchema) => {
    const settings = transforGeneralSettingsToSettings(data);
    updateSettingsMutate(
      { data: settings },
      {
        onSuccess: () => {
          reset(data);
        },
      },
    );
  };

  return (
    <EditFormLayout onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Configuración general
        </h1>

        <GeneralSettingsProfile />
        <GeneralSettingsWhatsapp />
        <GeneralSettingsSocialNetworks />
      </div>
    </EditFormLayout>
  );
};

export default GeneralSettings;
