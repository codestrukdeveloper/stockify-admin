import { z } from "zod";



export const createShareholderDto = z.object({
    name: z.string().max(100, "Name must not exceed 100 characters"),
    percent: z.string().max(50, "Percent must not exceed 50 characters"),
    asOf: z
    .string()
    .refine(
      (value) => !isNaN(Date.parse(value)), 
      { message: "Invalid date format" }
    )
    .optional(),
});

export const updateShareholderDto = createShareholderDto;



export type CreateShareholderDto = z.infer<typeof createShareholderDto>;
export type UpdateShareholderDto = z.infer<typeof updateShareholderDto>;
