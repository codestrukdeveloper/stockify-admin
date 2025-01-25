import z from "zod";

export const createCategoryDto = z.object({
    name: z.string(),
});

export const createMultipleCategoryDto =z.array(z.object({
    name: z.string(),
}));

export const updateCategoryDto = z.object({
    _id: z.string().length(24),
    name: z.string().optional(),
});





export type CreateCategoryDto = z.infer<typeof createCategoryDto>;
export type CreateMultipleCategoryDto = z.infer<typeof createMultipleCategoryDto>;

export type UpdateCategoryDto = z.infer<typeof updateCategoryDto>;