import { z } from "zod";
import { commonNumber } from "./common.dto";



export const createShareholderDto = z.object({
    name: z.string().max(100, "Name must not exceed 100 characters"),
    percent: commonNumber,
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
