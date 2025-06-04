import {
  GENERAL_SETTINGS_KEYS,
  GeneralSettings,
  SettingItem,
} from "@/types/setting";

export const SETTINGS_CATEGORY_DEFAULT = "general";

export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
  storeName: "",
  facebookProfile: "",
  instagramProfile: "",
  tiktokProfile: "",
  whatsappNumber: "",
};

export const transforGeneralSettingsToSettings = (
  generalSettings: GeneralSettings,
): Omit<SettingItem, "id" | "created_at" | "updated_at" | "category">[] => {
  return GENERAL_SETTINGS_KEYS.map((key) => ({
    key: key,
    value: generalSettings[key] || null,
    type: "string",
  }));
};
