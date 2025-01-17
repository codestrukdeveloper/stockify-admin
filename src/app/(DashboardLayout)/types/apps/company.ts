import { ICategory } from "./category";
import { IDeposit } from "./deposit";
import { IBalanceSheet } from "./IBalanceSheet";
import { ICashflowSum } from "./ICashflowSum";
import { IDhrp } from "./IDhrp";
import { IKeyIndicators } from "./IKeyIndicators";
import { Industry } from "./industry";
import { IPriceTrend } from "./IPricingTrend.interface";
import { IProfitLosses } from "./IProfitLoss";
import { IPerformance } from "./peformance";
import { ISector } from "./sector";

export interface ICompany  {
    _id?:string;
    name: string;
    ticker: string;
    isin: string;
    pan?: string;
    location?: string;
    rating?: number;
    price?: number;
    qty?: number;
    minQty?: number;
    maxQty?: number;
    lot?: number;
    email?: string;
    phone?: string;
    website?: string;
    videoLink?: string;
    shareholderFile?: string;
    dhrpLink?: string;
    aboutus?: string;
    categoryId?: string;
    depositsId?: string[];

    industryId?: string;
    sectorId?: string;
    dhrpId?: string;
    performanceId?: string;
    slug?: string;
    logo?: string;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?:boolean;
    deletedAt?: Date;
};


export interface ICompanyFull {
    company:ICompany,
    sector:ISector,
    industry:Industry
    performance:IPerformance,
    category:ICategory,
    deposits:IDeposit[],
    dhrp:IDhrp,
    profitLoss:IProfitLosses[],
    priceTrend:IPriceTrend[],
    keyIndicators:IKeyIndicators[],
    balanceSheet:IBalanceSheet[],
    cashFlow?:ICashflowSum[],
}