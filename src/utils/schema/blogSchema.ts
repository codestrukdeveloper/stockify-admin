import { z } from 'zod';



// Define Zod schema for Category
export const CategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
});

// Define Zod schema for Blog
export const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  author: z.string().min(1, "Author is required"),
  categories: z.array(CategorySchema).min(1, "Category is required"),
  tags: z.array(z.string().min(1, "Tag is required")),
  featuredImage: z.string().min(1,"featured image is required"),
  seoTitle: z.string().min(1, "SEO title is required"),
  seoDescription: z.string().min(1, "SEO description is required"),
  seoKeywords: z.array(z.string().min(1, "SEO keyword is required")),
  status: z.enum(['draft', 'published']),
  relatedStocks: z.array(z.string()).optional(), // ObjectId as string array
  publishedAt: z.coerce.date(), // ObjectId as string array
});

export type ICategoryDTO = z.infer<typeof CategorySchema>;
export type IBlogDTO = z.infer<typeof BlogSchema>;
