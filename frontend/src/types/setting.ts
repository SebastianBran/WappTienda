export interface GeneralSettings {
  storeName?: string;
  whatsappNumber?: string;
  facebookProfile?: string;
  instagramProfile?: string;
  tiktokProfile?: string;
}

export interface SettingItem {
  id: number;
  key: string;
  value: string | null;
  category: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export const GENERAL_SETTINGS_KEYS = [
  "storeName",
  "facebookProfile", 
  "instagramProfile",
  "tiktokProfile",
  "whatsappNumber",
] as const;

export type GeneralSettingsKey = typeof GENERAL_SETTINGS_KEYS[number];
