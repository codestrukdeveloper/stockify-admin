import { z } from "zod";
import { commonString, objectIdSchema, periodString } from "./common.dto";

export const BalanceSheetDto = z.object({
    period: periodString,
    cashEqlt: commonString.default("0"),
    nonCurrentAsset: commonString.default("0"),
    currentAsset: commonString.default("0"),
    totalAsset: commonString.default("0"),
    eqShareCap: commonString.default("0"),
    reserves: commonString.default("0"),
    totalEq: commonString.default("0"),
    nonCurrentLiability: commonString.default("0"),
    currentLiability: commonString.default("0"),
    totalLiability: commonString.default("0"),
    totalEqLiability: commonString.default("0"),
  });

  export const UpdateBalanceSheetDto=BalanceSheetDto.partial().extend({
    _id:objectIdSchema.optional()
  })
  