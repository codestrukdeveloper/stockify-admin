import z from "zod";

export const createDepositDto = z.object({
    name: z.string(),
});

export const updateDepositDto = z.object({
    _id: z.string().length(24),
    name: z.string().optional(),
});






export type CreateDepositDto = z.infer<typeof createDepositDto>;
export type UpdateDepositDto = z.infer<typeof updateDepositDto>;