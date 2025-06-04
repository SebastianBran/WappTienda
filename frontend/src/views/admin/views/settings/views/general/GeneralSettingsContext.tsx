import { GeneralSettings } from "@/types/setting";
import { createContext } from "react";

export type GeneralSettingsContextValue = {
  settings: GeneralSettings;
};

const GeneralSettingsContext = createContext<GeneralSettingsContextValue>(
  {} as GeneralSettingsContextValue,
);

export default GeneralSettingsContext;
