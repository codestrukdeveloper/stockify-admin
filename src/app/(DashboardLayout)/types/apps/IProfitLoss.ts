
export interface IProfitLosses {
  _id?:string;
    period?: Date;
    revenue?: string;
    expense?: string;
    ebdita?: string;
    otherCost?: string;
    pbt?: string;
    taxExpense?: string;
    pat?: string;
    otherIncExpense?: string;
    incomeNet?: string;
    outstandingShare?: string;
    epsPerShare?: string;
    revGrowth?: string;
    ebitaMargin?: string;
    patMargin?: string;
    epsGrowth?: string;
    companyId:  string;  
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  }
  