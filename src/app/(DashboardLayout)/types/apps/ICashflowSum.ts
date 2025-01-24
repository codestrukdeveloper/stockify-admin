
export interface ICashflowSum {

  _id?: string;
  companyId?: string;
  period: string; // Period in the form of a string
  operatingAct: string; // Operating activities cash flow
  investingAct: string; // Investing activities cash flow
  financialAct: string; // Financial activities cash flow
  netCashFlow: string; // Net cash flow
  createdAt?: string; // Auto-generated
  updatedAt?: string; // Auto-generated
  deletedAt?: string | null; // Soft delete timestamp
}
