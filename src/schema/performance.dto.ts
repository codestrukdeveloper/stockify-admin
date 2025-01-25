import z from "zod";

export const createPerformanceDto = z.object({
    name: z.string(),
});

export const updatePerformanceDto = z.object({
    _id: z.string().length(24),
    name: z.string().optional(),
});






export type CreatePerformanceDto = z.infer<typeof createPerformanceDto>;
export type UpdatePerformanceDto = z.infer<typeof updatePerformanceDto>;