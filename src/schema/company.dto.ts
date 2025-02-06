import { z } from "zod";
import { commonNumber, commonString, objectIdSchema, periodString } from "./common.dto";
import { createShareholderDto, updateShareholderDto } from "./shareholder.dto";
import { CreateProfitLossesDto, updateProfitLossesDto } from "./profitloss.dto";
import { createPriceTrendDto, updatePriceTrendDto } from "./pricing.trend.dto";
import { createCashflowSumDto, updateCashflowSumDto } from "./cashflow.dto";
import { BalanceSheetDto, UpdateBalanceSheetDto } from "./balanceSheet.dto";
import { KeyIndicatorsDto, UpdateKeyIndicatorsDto } from "./keyIndicators.dto";
import { createManagementDto } from "./management.dto";

// Custom error messages for ProfitLossesDto
// export const CreateProfitLossesDto = z.object({
//   period: periodString,
//   revenue: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "Revenue must be a valid number" }),
//   expense: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "Expense must be a valid number" }),
//   ebdita: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "EBDITA must be a valid number" }),
//   otherCost: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "Other Cost must be a valid number" }),
//   pbt: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "PBT must be a valid number" }),
//   taxExpense: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "Tax Expense must be a valid number" }),
//   pat: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "PAT must be a valid number" }),
//   otherIncExpense: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "Other Income/Expense must be a valid number" }),
//   incomeNet: z.string().default("0").refine(val => !isNaN(Number(val)), { message: "Net Income must be a valid number" }),
//   outstandingShare: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "Outstanding Shares must be a valid number" }),
//   epsPerShare: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "EPS per Share must be a valid number" }),
//   revGrowth: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "Revenue Growth must be a valid number" }),
//   ebitaMargin: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "EBITA Margin must be a valid number" }),
//   patMargin: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "PAT Margin must be a valid number" }),
//   epsGrowth: commonString.default("0").refine(val => !isNaN(Number(val)), { message: "EPS Growth must be a valid number" }),
// });

// Custom error messages for addCompanyLogoDto
export const addCompanyLogoDto = z.object({
  logo: z.string().min(1, "Logo URL is required"),
  _id: objectIdSchema,
});

// Custom error messages for slugDto
export const slugDto = z.object({
  slug: z.string().min(1, "Slug is required"),
});

// Custom error messages for addDhrpLink
export const addDhrpLink = z.object({
  dhrp: z.string().min(1, "DHRP link is required"),
  _id: objectIdSchema,
});

// Custom error messages for faqDto
export const faqDto = z.object({
  answer: z.string().min(1, "Answer is required"),
  question: z.string().min(1, "Question is required"),
});

// Custom error messages for financialResultsSchema
export const financialResultsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  period: periodString,
  document: z.string().min(1, "Document URL is required"),
});

// Custom error messages for companyBaseSchema
const companyBaseSchema = z.object({
  minQty: commonNumber.optional().refine(val => !isNaN(Number(val)), { message: "Minimum Quantity must be a valid number" }),
  ticker: z.string().max(10, "Ticker must be at most 10 characters").nonempty("Ticker is required"),
  slug: z.string().max(100, "Slug must be at most 100 characters").nonempty("Slug is required"),
  name: z.string().max(100, "Name must be at most 100 characters").nonempty("Name is required"),
  status: z.boolean().default(true).optional(),
  maxQty: commonNumber.optional().refine(val => !isNaN(Number(val)), { message: "Maximum Quantity must be a valid number" }),
  logo: z.string().max(100, "Logo URL must be at most 100 characters"),
  categoryId: objectIdSchema,
  industryId: objectIdSchema,
  metaTitle: z.string().max(100),
  metaDescription: z.string().max(160),
  keywords: z.array(z.string()),

  qty: commonNumber.refine(val => !isNaN(Number(val)), { message: "Quantity must be a valid number" }),
  sectorId: objectIdSchema,
  dhrpId: objectIdSchema,
  ipoPrice: commonNumber,
  ipoDate: periodString,
  depositsId: z.array(objectIdSchema).min(1, "At least one deposit is required"),
  performanceId: objectIdSchema.optional(),
  isin: z.string().max(50, "ISIN must be at most 50 characters"),
  pan: z.string().max(50, "PAN must be at most 50 characters").optional(),
  location: z.string().max(200, "Location must be at most 200 characters"),
  rating: commonNumber.optional().default("0"),
  price: commonNumber.refine(val => !isNaN(Number(val)), { message: "Price must be a valid number" }),
  lot: commonNumber.optional().refine(val => !isNaN(Number(val)), { message: "Lot must be a valid number" }),
  email: z.string().email("Invalid email format").max(50, "Email must be at most 50 characters"),
  // phone: z.string().max(50, "Phone number must be at most 50 characters"),
  // website: z.string().max(100, "Website URL must be at most 100 characters").optional(),
  phone: z.string()
  .regex(/^\d+$/, "Phone number must contain only digits")
  .max(15, "Phone number must be at most 15 digits"),
website: z.string()
  .regex(/^www\./, "Website must start with 'www.'")
  .max(100, "Website URL must be at most 100 characters")
  .optional(),
  videoLink: z.string().url("Invalid URL format").max(100, "Video link must be at most 100 characters").optional(),
  shareholderFile: z.string().max(100, "Shareholder file URL must be at most 100 characters").optional(),
  dhrpLink: z.string().optional(),
  management: z.array(createManagementDto).min(1, "At least one management member is required"),
  aboutus: z.string().min(1, "About Us is required"),
  faq: z.array(faqDto).min(1, "At least one FAQ is required"),
  financialResults: z.array(financialResultsSchema).optional(),
  shareHolders: z.array(createShareholderDto).min(1, "At least one shareholder is required"),
});

// Custom error messages for companyFullSchema
const companyFullSchema = z.object({
  company: companyBaseSchema,
  priceTrend: z.array(createPriceTrendDto).min(1, "At least one price trend is required"),
  profitLoss: z.array(CreateProfitLossesDto).min(1, "At least one profit/loss entry is required"),
  balanceSheet: z.array(BalanceSheetDto).min(1, "At least one balance sheet entry is required"),
  cashFlow: z.array(createCashflowSumDto).min(1, "At least one cash flow entry is required"),
  keyIndicators: z.array(KeyIndicatorsDto).min(1, "At least one key indicator is required"),
});

export const createCompanyDto = companyFullSchema.omit({});
export type createCompanyDto = z.infer<typeof companyFullSchema>;




// Custom error messages for companyBaseSchema
const companyBaseSchemaUpdate = z.object({
  minQty: commonNumber.optional().refine(val => !isNaN(Number(val)), { message: "Minimum Quantity must be a valid number" }),
  ticker: z.string().max(10, "Ticker must be at most 10 characters").nonempty("Ticker is required"),
  slug: z.string().max(100, "Slug must be at most 100 characters").nonempty("Slug is required"),
  name: z.string().max(100, "Name must be at most 100 characters").nonempty("Name is required"),
  status: z.boolean().default(true).optional(),
  maxQty: commonNumber.optional().refine(val => !isNaN(Number(val)), { message: "Maximum Quantity must be a valid number" }),
  logo: z.string().optional(),
  categoryId: objectIdSchema,
  industryId: objectIdSchema,
  metaTitle: z.string().max(100),
  metaDescription: z.string().max(160),
  keywords: z.array(z.string()),
  ipoPrice: z.string().optional(),
  ipoDate: z.string().optional(),
  qty: commonNumber.refine(val => !isNaN(Number(val)), { message: "Quantity must be a valid number" }),
  sectorId: objectIdSchema,
  dhrpId: objectIdSchema,
  depositsId: z.array(objectIdSchema).min(1, "At least one deposit is required"),
  performanceId: objectIdSchema.optional(),
  isin: z.string().max(50, "ISIN must be at most 50 characters"),
  pan: z.string().max(50, "PAN must be at most 50 characters").optional(),
  location: z.string().max(200, "Location must be at most 200 characters"),
  rating: commonNumber.optional().default("0"),
  price: commonNumber.refine(val => !isNaN(Number(val)), { message: "Price must be a valid number" }),
  lot: commonNumber.optional().refine(val => !isNaN(Number(val)), { message: "Lot must be a valid number" }),
  email: z.string().email("Invalid email format").max(50, "Email must be at most 50 characters"),
  // phone: z.string().max(50, "Phone number must be at most 50 characters"),
  // website: z.string().max(100, "Website URL must be at most 100 characters").optional(),
  phone: z.string()
  .regex(/^\d+$/, "Phone number must contain only digits")
  .max(15, "Phone number must be at most 15 digits"),
website: z.string()
  .regex(/^www\./, "Website must start with 'www.'")
  .max(100, "Website URL must be at most 100 characters")
  .optional(),
  videoLink: z.string().url("Invalid URL format").max(100, "Video link must be at most 100 characters").optional(),
  shareholderFile: z.string().max(100, "Shareholder file URL must be at most 100 characters").optional(),
  dhrpLink: z.string().optional(),
  management: z.array(createManagementDto).min(1, "At least one management member is required"),
  aboutus: z.string().min(1, "About Us is required"),
  faq: z.array(faqDto).min(1, "At least one FAQ is required"),
  financialResults: z.array(financialResultsSchema).optional(),
  shareHolders: z.array(createShareholderDto).min(1, "At least one shareholder is required"),
});

const updateCompanyBaseSchema = z.object({
  company: companyBaseSchemaUpdate,
  priceTrend: z.array(updatePriceTrendDto),
  shareHolders: z.array(updateShareholderDto),
  profitLoss: z.array(updateProfitLossesDto),
  balanceSheet: z.array(UpdateBalanceSheetDto),
  cashFlow: z.array(updateCashflowSumDto).optional(),
  keyIndicators: z.array(UpdateKeyIndicatorsDto),
});



export const updateCompanyDto = updateCompanyBaseSchema.partial().extend({
  _id: objectIdSchema,
});

export type updateCompanyDto = z.infer<typeof updateCompanyDto>;
export type slugDto = z.infer<typeof slugDto>;