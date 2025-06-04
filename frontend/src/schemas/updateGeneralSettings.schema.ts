import { z } from "zod";

const updateGeneralSettingsSchema = z.object({
  storeName: z.string().optional(),
  whatsappNumber: z.string().optional(),
  facebookProfile: z.string().optional(),
  instagramProfile: z.string().optional(),
  tiktokProfile: z.string().optional(),
});

export type UpdateGeneralSettingsSchema = z.infer<
  typeof updateGeneralSettingsSchema
>;

export default updateGeneralSettingsSchema;
