import { z } from "zod";
import { objectIdSchema, periodString } from "./common.dto";

export const CreateProfitLossesDto = z.object({
  period: periodString,
  revenue: z.string().default("0"),
  expense: z.string().default("0"),
  ebdita: z.string().default("0"),
  otherCost: z.string().default("0"),
  pbt: z.string().default("0"),
  taxExpense: z.string().default("0"),
  pat: z.string().default("0"),
  otherIncExpense: z.string().default("0"),
  incomeNet: z.string().default("0"),
  outstandingShare: z.string().default("0"),
  epsPerShare: z.string().default("0"),
  revGrowth: z.string().default("0"),
  ebitaMargin: z.string().default("0"),
  patMargin: z.string().default("0"),
  epsGrowth: z.string().default("0"),
  companyId: objectIdSchema.optional(),
});

export const updateProfitLossesDto=CreateProfitLossesDto.partial().extend({
    _id:objectIdSchema.optional()
});

export type UpdateProfitLossesDtoType = z.infer<typeof updateProfitLossesDto>;

export type CreateProfitLossesDtoType = z.infer<typeof CreateProfitLossesDto>;
