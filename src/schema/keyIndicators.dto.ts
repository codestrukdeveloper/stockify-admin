import { z } from "zod";
import { commonAnyDate, commonString, objectIdSchema, periodString } from "./common.dto";

export const KeyIndicatorsDto = z.object({
  period: periodString,
  currentSharePrice: commonString.default("0"),
  faceValuePerShare: commonString.default("0"),
  bookValuePerShare: commonString.default("0"),
  priceToEarning: commonString.default("0"),
  priceToSales: commonString.default("0"),
  priceToBook: commonString.default("0"),
  outstandingSharesMillion: commonString.default("0"),
  marketCapMillionRs: commonString.default("0"),
  debtToEquity: commonString.default("0"),
  dividendPerShare: commonString.default("0"),
  dividendPercentOnCMP: commonString.default("0"),
  returnOnTotalAssets: commonString.default("0"),
  returnOnEquity: commonString.default("0"),
  rowc: commonString.default("0"),
});

export const UpdateKeyIndicatorsDto = KeyIndicatorsDto.extend({
  _id: objectIdSchema.optional(),
  deletedAt:commonAnyDate.optional()
});

export type KeyIndicators=z.infer<typeof UpdateKeyIndicatorsDto>; 
