import { z } from "zod";
import { commonNumber, commonString, objectIdSchema, periodString } from "./common.dto";
import { createShareholderDto, updateShareholderDto } from "./shareholder.dto";
import { updateProfitLossesDto } from "./profitloss.dto";
import { createPriceTrendDto, updatePriceTrendDto } from "./pricing.trend.dto";
import { createCashflowSumDto, updateCashflowSumDto } from "./cashflow.dto";
import { BalanceSheetDto, UpdateBalanceSheetDto } from "./balanceSheet.dto";
import { KeyIndicatorsDto, UpdateKeyIndicatorsDto } from "./keyIndicators.dto";
import { createManagementDto } from "./management.dto";

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
  revGrowth: commonString.default("0"),
  ebitaMargin: commonString.default("0"),
  patMargin: commonString.default("0"),
  epsGrowth: commonString.default("0"),
});

export const addCompanyLogoDto = z.object({
  logo: z.string(),
  _id: objectIdSchema

});

export const slugDto = z.object({
  slug: z.string(),
});

export const addDhrpLink = z.object({
  dhrp: z.string(),
  _id: objectIdSchema

});


export const faqDto = z.object({
  answer: z.string(),
  question: z.string(),
});

const companyBaseSchema = z.object({
  name: z.string().max(100).nonempty("Name is required"),
  ticker: z.string().max(100).nonempty("Name is required"),
  isin: z.string().max(50),
  pan: z.string().max(50).optional(),
  location: z.string().max(200),
  rating: commonNumber.optional().default("0"),
  price: commonNumber,
  qty: commonNumber,
  minQty: commonNumber.optional(),
  maxQty: commonNumber.optional(),
  lot: commonNumber.optional(),
  email: z.string().email("Invalid email format").max(50),
  phone: z.string().max(50),
  website: z.string().max(100).optional(),
  videoLink: z.string().url("Invalid URL format").max(100).optional(),
  shareholderFile: z.string().max(100).optional(),
  dhrpLink: z.string().optional(),
  aboutus: z.string(),
  categoryId: objectIdSchema,
  industryId: objectIdSchema,
  sectorId: objectIdSchema,
  dhrpId: objectIdSchema,
  depositsId: z.array(objectIdSchema),
  performanceId: objectIdSchema.optional(),
  slug: z.string().max(100),
  faq: z.array(
    faqDto
  ),

  logo: z.string().max(100),
  status: z.boolean().default(true).optional(),
});

const companyFullSchema = z.object({
  company: companyBaseSchema,
  priceTrend: z.array(createPriceTrendDto).optional(),
  shareHolders: z.array(createShareholderDto).optional(),
  management: z.array(createManagementDto).optional(),
  profitLoss: z.array(CreateProfitLossesDto).optional(),
  balanceSheet: z.array(BalanceSheetDto).optional(),
  cashFlow: z.array(createCashflowSumDto).optional(),
  KeyIndicators: z.array(KeyIndicatorsDto).optional(),
});


export const createCompanyDto = companyFullSchema.omit({});

export type createCompanyDto = z.infer<typeof companyFullSchema>;


const updateCompanyBaseSchema = z.object({
  company: companyBaseSchema.optional(),
  priceTrend: z.array(updatePriceTrendDto).optional(),
  shareHolders: z.array(updateShareholderDto).optional(),
  profitLoss: z.array(updateProfitLossesDto).optional(),
  balanceSheet: z.array(UpdateBalanceSheetDto).optional(),
  cashFlow: z.array(updateCashflowSumDto).optional(),
  keyIndicators: z.array(UpdateKeyIndicatorsDto).optional(),
});

export const updateCompanyDto = companyFullSchema.partial().extend({
  _id: objectIdSchema
});

export type updateCompanyDto = z.infer<typeof updateCompanyDto>;
export type slugDto = z.infer<typeof slugDto>;