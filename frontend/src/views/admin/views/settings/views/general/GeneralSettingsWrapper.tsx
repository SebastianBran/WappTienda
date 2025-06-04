import { FC, PropsWithChildren, useEffect, useState } from "react";
import GeneralSettingsContext, {
  GeneralSettingsContextValue,
} from "./GeneralSettingsContext";
import { useParams } from "react-router-dom";
import useGetAllSettingsQuery from "@/api/queries/useGetAllSettingsQuery";
import updateGeneralSettingsSchema, {
  UpdateGeneralSettingsSchema,
} from "@/schemas/updateGeneralSettings.schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneralSettings } from "@/types/setting";
import ViewLoading from "@/components/common/ViewLoading";
import {
  DEFAULT_GENERAL_SETTINGS,
} from "../utils/settings.utils";

const GeneralSettingsWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { settingsCategory } = useParams();
  const { data: settings, isPending } = useGetAllSettingsQuery(
    settingsCategory || "general",
  );
  const form = useForm<UpdateGeneralSettingsSchema>({
    defaultValues: DEFAULT_GENERAL_SETTINGS,
    resolver: zodResolver(updateGeneralSettingsSchema),
  });
  const [formattedSettings, setFormattedSettings] = useState<GeneralSettings>(
    DEFAULT_GENERAL_SETTINGS,
  );
  const { reset } = form;

  useEffect(() => {
    if (settings) {
      const formattedSettings = {
        storeName: (settings["storeName"] as string) || "",
        facebookProfile: (settings["facebookProfile"] as string) || "",
        instagramProfile: (settings["instagramProfile"] as string) || "",
        whatsappNumber: (settings["whatsappNumber"] as string) || "",
        tiktokProfile: (settings["tiktokProfile"] as string) || "",
      };
      setFormattedSettings(formattedSettings);
      reset(formattedSettings);
    }
  }, [settings, reset]);

  if (isPending || !settings) {
    return <ViewLoading />;
  }

  const value: GeneralSettingsContextValue = {
    settings: formattedSettings,
  };

  return (
    <GeneralSettingsContext.Provider value={value}>
      <FormProvider {...form}>{children}</FormProvider>
    </GeneralSettingsContext.Provider>
  );
};

export default GeneralSettingsWrapper;
