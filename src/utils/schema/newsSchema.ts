import { z } from 'zod';


// Define Zod schema for News
export const NewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().min(1, "Link is required"),
  type: z.string().min(1, "Type is required"),
  image: z.string().optional(), // ObjectId as string array
});

export const updateNewsSchema=NewsSchema.partial().extend({
  _id:z.string()
})
export type INewsDTO = z.infer<typeof NewsSchema>;
