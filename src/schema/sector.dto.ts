import z from "zod";

export const createSectorDto = z.object({
    name: z.string().min(1, "Name is required"),
});

export const createMultipleSectorDto =z.array(z.object({
    name: z.string().min(1, "Name is required"),
}));


export const updateSectorDto = z.object({
    _id: z.string().length(24),
    name: z.string().min(1, "Name is required").optional(),
});






export type CreateSectorDto = z.infer<typeof createSectorDto>;
export type CreateMultipleSectorDto = z.infer<typeof createMultipleSectorDto>;

export type UpdateSectorDto = z.infer<typeof updateSectorDto>;