import { z } from "zod";
import { objectIdSchema } from "./common.dto";

const periodRegex = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}-\d{4}$/;

export const periodString = z
  .string()
  .refine((data) => periodRegex.test(data), {
    message: "Invalid period format. Expected format: MMM-DD-YYYY (e.g., Apr-01-2025)",
  });

export const createPriceTrendDto = z.object({
  price: z.union([z.string(), z.number()]).transform(String).default("0"),
  label: z.string().max(100),
  period: periodString,
});

export const updatePriceTrendDto = createPriceTrendDto.extend({
  _id: objectIdSchema.optional(),
});

export type CreatePriceTrendDto = z.infer<typeof createPriceTrendDto>;
export type UpdatePriceTrendDto = z.infer<typeof updatePriceTrendDto>;
