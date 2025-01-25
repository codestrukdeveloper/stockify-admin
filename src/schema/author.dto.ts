import { z } from "zod";
import { objectIdSchema } from "./common.dto";

export const AuthorSchema = z.object({
    name: z.string(),
    bio: z.string().optional(),
    image: z.string().optional(),
    socialLinks: z
      .object({
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
      })
      .optional(),
  });


export const UpdateAuthorSchema = AuthorSchema.partial().extend({
  _id:objectIdSchema
})

  
  export type AuthorDto = z.infer<typeof AuthorSchema>;
  export type UpdateAuthorDto = z.infer<typeof UpdateAuthorSchema>;
