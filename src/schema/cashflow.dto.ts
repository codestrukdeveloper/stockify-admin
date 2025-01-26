import { z } from "zod";
import { objectIdSchema, periodString } from "./common.dto";

export const createCashflowSumDto = z.object({
    period: periodString,
    operatingAct: z.string().max(50),
    investingAct: z.string().max(50),
    financialAct: z.string().max(50),
    netCashFlow: z.string().max(50),
    companyId:  objectIdSchema.optional()
});

export const updateCashflowSumDto = createCashflowSumDto.partial().extend({
    _id:objectIdSchema.optional()
});

export type UpdateCashflowSumDto = z.infer<typeof updateCashflowSumDto>;

export type CreateCashflowSumDto = z.infer<typeof createCashflowSumDto>;
