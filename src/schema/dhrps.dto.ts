import z from "zod";

export const createDhrpsDto = z.object({
    name: z.string(),
});

export const updateDhrpsDto = z.object({
    _id: z.string().length(24),
    name: z.string().optional(),
});






export type CreateDhrpsDto = z.infer<typeof createDhrpsDto>;
export type UpdateDhrpsDto = z.infer<typeof updateDhrpsDto>;