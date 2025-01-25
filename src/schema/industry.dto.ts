import z from "zod";

export const createIndustryDto = z.object({
    name: z.string(),
});

export const multicreateIndustryDto = z.array(z.object({
    name: z.string(),
}));


export const updateIndustryDto = z.object({
    _id: z.string().length(24),
    name: z.string().optional(),
});






export type CreateIndustryDto = z.infer<typeof createIndustryDto>;
export type CreateMultipleIndustryDto = z.infer<typeof multicreateIndustryDto>;

export type UpdateIndustryDto = z.infer<typeof updateIndustryDto>;