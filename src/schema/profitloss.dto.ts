import { z } from "zod";
import { commonString, objectIdSchema, periodString } from "./common.dto";

export const CreateProfitLossesDto = z.object({
  period: periodString,
  revenue: commonString.default("0"),
  expense: commonString.default("0"),
  ebdita: commonString.default("0"),
  otherCost: commonString.default("0"),
  pbt: commonString.default("0"),
  taxExpense: commonString.default("0"),
  pat: commonString.default("0"),
  otherIncExpense: commonString.default("0"),
  incomeNet: z.string().default("0"),
  outstandingShare: commonString.default("0"),
  epsPerShare: commonString.default("0"),
  revGrowth: z.string().default("0"),
  ebitaMargin: z.string().default("0"),
  patMargin: z.string().default("0"),
  epsGrowth: z.string().default("0"),
  companyId: objectIdSchema,
});

export const updateProfitLossesDto=CreateProfitLossesDto.partial().extend({
    _id:objectIdSchema
});

export type UpdateProfitLossesDtoType = z.infer<typeof updateProfitLossesDto>;

export type CreateProfitLossesDtoType = z.infer<typeof CreateProfitLossesDto>;
