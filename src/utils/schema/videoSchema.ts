import { z } from 'zod';


// Define Zod schema for Video
export const VideoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().min(1, "Link is required"),
  companyId: z.string().min(1, "Company Id is required"),
});

export const updateVideoSchema=VideoSchema.partial().extend({
  _id:z.string()
})
export type IVideoDTO = z.infer<typeof VideoSchema>;
