import { z } from "zod";
import { objectIdSchema } from "./common.dto";
import { periodString } from "./common.dto";

export const createPriceTrendDto = z.object({
    price: z.string().default("0"),
    label: z.string().max(100),
    period:periodString,
});

export const updatePriceTrendDto = createPriceTrendDto.extend({
    _id: objectIdSchema.optional(),
});

export type CreatePriceTrendDto = z.infer<typeof createPriceTrendDto>;
export type UpdatePriceTrendDto = z.infer<typeof updatePriceTrendDto>;
