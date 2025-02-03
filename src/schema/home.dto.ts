import z from "zod";
import { commonAnyDate, commonNumber, objectIdSchema } from "./common.dto";

export const HomeSchema = z.object({
    name: z.string().max(150),
    companyId: z.array(z.string()),
  });
  
  export type HomeDto = z.infer<typeof HomeSchema>;
  

  export const createHomeDto = HomeSchema;

export const updateHomeDto = HomeSchema.partial().extend({
    _id: z.string(),
});




export type createHomeDto = z.infer<typeof HomeSchema>;
export type updateHomeDto = z.infer<typeof updateHomeDto>;
