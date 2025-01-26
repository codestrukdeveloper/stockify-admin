import z from "zod";
import { commonAnyDate, commonNumber, objectIdSchema } from "./common.dto";


export const CategorySchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
  });
  




  

export const BlogSchema = z.object({
    title: z.string().max(150),
    slug: z.string(),
    content: z.string(),
    excerpt: z.string().max(160),
    author: objectIdSchema,
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    featuredImage: z.string(),
    seoTitle: z.string().max(60),
    seoDescription: z.string().max(160),
    seoKeywords: z.array(z.string()),
    status: z.enum(["draft", "published"]).default("draft"),
    readTime: commonNumber.optional(),
    relatedStocks: z.array(objectIdSchema).optional(),
  });
  
  export type BlogDto = z.infer<typeof BlogSchema>;
  

  export const createBlogDto = BlogSchema;

export const updateBlogDto = BlogSchema.partial().extend({
    _id: z.string(),
});

export const slugBlogDto = z.object({
  slug: z.string(),
});



export type createBlogDto = z.infer<typeof BlogSchema>;
export type updateBlogDto = z.infer<typeof updateBlogDto>;
export type slugBlogDto = z.infer<typeof slugBlogDto>;

export type CategoryDto = z.infer<typeof CategorySchema>;
