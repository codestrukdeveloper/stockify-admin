
export interface IBalanceSheet  {
    _id?:string;
    period?: Date;
    cashEqlt?: string;
    nonCurrentAsset?: string;
    currentAsset?: string;
    totalAsset?: string;
    eqShareCap?: string;
    reserves?: string;
    totalEq?: string;
    nonCurrentLiability?: string;
    currentLiability?: string;
    totalLiability?: string;
    totalEqLiability?: string;
    companyId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null; // For soft deletes
}
