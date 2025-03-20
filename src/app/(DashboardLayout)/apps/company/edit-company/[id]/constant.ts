// constants.ts

import { IKeyIndicators } from "@/app/(DashboardLayout)/types/apps/IKeyIndicators";
import { IBalanceSheet } from "@/app/(DashboardLayout)/types/apps/IBalanceSheet";
import { ICashflowSum } from "@/app/(DashboardLayout)/types/apps/ICashflowSum";
import { IPriceTrend } from "@/app/(DashboardLayout)/types/apps/IPricingTrend.interface";
import { IProfitLosses } from "@/app/(DashboardLayout)/types/apps/IProfitLoss";

export const keyIndicatorsInitialValue: IKeyIndicators = {
  period: "2025",
  currentSharePrice: "0",
  faceValuePerShare: "0",
  bookValuePerShare: "0",
  priceToEarning: "0",
  priceToSales: "0",
  priceToBook: "0",
  outstandingSharesMillion: "0",
  marketCapMillionRs: "0",
  debtToEquity: "0",
  dividendPercentOnCMP: "0",
  dividendPerShare: "0",
  returnOnEquity: "0",
  returnOnTotalAssets: "0",
  rowc: "0",
};

export const initialBalanceSheet: IBalanceSheet = {
  period: new Date().getFullYear().toString(),
  cashEqlt: "0",
  nonCurrentAsset: "0",
  currentAsset: "0",
  totalAsset: "0",
  eqShareCap: "0",
  reserves: "0",
  totalEq: "0",
  nonCurrentLiability: "0",
  currentLiability: "0",
  totalLiability: "0",
  totalEqLiability: "0",
  companyId: "",
};

export const initialCashflowSum: ICashflowSum = {
  period: new Date().getFullYear().toString(),
  operatingAct: "0",
  investingAct: "0",
  financialAct: "0",
  netCashFlow: "0",
};

export const initialPriceTrend: IPriceTrend = {
  price: "0",
  label: "",
  period: new Date().getFullYear().toString(),
};

export const initialProfitLosses: IProfitLosses = {
  period: new Date().getFullYear().toString(),
  revenue: "0",
  expense: "0",
  ebdita: "0",
  otherCost: "0",
  pbt: "0",
  taxExpense: "0",
  pat: "0",
  otherIncExpense: "0",
  incomeNet: "0",
  outstandingShare: "0",
  epsPerShare: "0",
  revGrowth: "0",
  ebitaMargin: "0",
  patMargin: "0",
  epsGrowth: "0",
  companyId: "",
};
