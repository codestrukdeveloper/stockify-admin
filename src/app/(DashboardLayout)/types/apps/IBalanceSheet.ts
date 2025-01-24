
export interface IBalanceSheet {
    _id?: string;
    period: string;
    cashEqlt: string;
    nonCurrentAsset: string;
    currentAsset: string;
    totalAsset: string;
    eqShareCap: string;
    reserves: string;
    totalEq: string;
    nonCurrentLiability: string;
    currentLiability: string;
    totalLiability: string;
    totalEqLiability: string;
    companyId?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string| null; // For soft deletes
}
