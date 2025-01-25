import { z } from "zod";
import { objectIdSchema } from "./common.dto";
import { NEWS_TYPE } from "@/enum/news.enum";

export const NewsDTOSchema = z.object({
  title: z.string().nonempty("Title is required"),
  link: z.string().url("Invalid URL format"),
  type: z.enum([NEWS_TYPE.BLOG,NEWS_TYPE.VIDEO]),
  companyId:objectIdSchema
});


export const updateNewsSchema=NewsDTOSchema.partial().extend({
  _id:objectIdSchema
});


export type UpdateNewsDTO = z.infer<typeof updateNewsSchema>;

export type NewsDTO = z.infer<typeof NewsDTOSchema>;
