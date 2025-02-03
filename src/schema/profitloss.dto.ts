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
  incomeNet: commonString.default("0"),
  outstandingShare: commonString.default("0"),
  epsPerShare: commonString.default("0"),
  revGrowth: commonString.default("0"),
  ebitaMargin: commonString.default("0"),
  patMargin: commonString.default("0"),
  epsGrowth: commonString.default("0"),
  companyId: objectIdSchema.optional(),
});

export const updateProfitLossesDto=CreateProfitLossesDto.extend({
    _id:objectIdSchema.optional()
});

export type UpdateProfitLossesDtoType = z.infer<typeof updateProfitLossesDto>;

export type CreateProfitLossesDtoType = z.infer<typeof CreateProfitLossesDto>;
