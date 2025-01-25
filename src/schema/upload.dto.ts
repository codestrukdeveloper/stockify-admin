import { z } from 'zod';

export const uploadFileSchema = z.object({
  fileName: z.string().min(1, 'File name is required'), 
  folder:z.enum(["blog","company","profile","documents"]),
  fileType: z.enum(["image/jpeg", "image/png", "application/vnd.ms-excel"]),
});

// Define a TypeScript type for the validated object
export type UploadFileDto = z.infer<typeof uploadFileSchema>;
