import { ICategory } from "./category";
import { IDeposit } from "./deposit";
import { IBalanceSheet } from "./IBalanceSheet";
import { ICashflowSum } from "./ICashflowSum";
import { IDhrp } from "./IDhrp";
import { IKeyIndicators } from "./IKeyIndicators";
import { IManagement } from "./IManagement";
import { IIndustry } from "./industry";
import { IPriceTrend } from "./IPricingTrend.interface";
import { IProfitLosses } from "./IProfitLoss";
import { IShareholder } from "./IShareholder";
import { IPerformance } from "./peformance";
import { ISector } from "./sector";

export interface IFinancialResults {
    title: string;
    period: string;
    document: string
};


export interface IFinancialResultsWithFile extends Omit<IFinancialResults, "document"> {
    document: File; 
}
export interface IFaq{
    question: string;
    answer:string
}
export interface ICompany {
    _id?: string;
    name: string;
    ticker: string;
    isin: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
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
    shareHolders?: IShareholder[];
    dhrpLink?: string;
    aboutus?: string;
    categoryId?: string;
    depositsId?: string[];
    management: IManagement[]
    industryId?: string;
    sectorId?: string;
    dhrpId?: string;
    performanceId?: string;
    slug?: string;
    logo?: string;
    status?: boolean;
    createdAt?: string;
    updatedAt?: string;
    isDeleted?: boolean;
    deletedAt?: Date;
    financialResults:IFinancialResults[]
    faq:IFaq[],
 
};



export interface ICompanyFull{
    company: ICompany,
    profitLoss: IProfitLosses[],
    priceTrend: IPriceTrend[],
    keyIndicators: IKeyIndicators[],
    balanceSheet: IBalanceSheet[],
    cashFlow: ICashflowSum[],
};

export interface ICompanyFullExtended extends ICompany {
    profitLoss: IProfitLosses[],
    priceTrend: IPriceTrend[],
    keyIndicators: IKeyIndicators[],
    balanceSheet: IBalanceSheet[],
    cashFlow: ICashflowSum[],
}

export type FILE_FOR = "pricing_trend" | "profit_loss" | "key_indicators" | "share_holder" | "cash_Flow" | "balanceSheet"