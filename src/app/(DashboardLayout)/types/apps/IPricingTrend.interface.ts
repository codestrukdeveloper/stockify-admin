
export interface IPriceTrend  {
    _id?:string;
    price: string;
    label: string;
    period: string;
    companyId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    isDeleted?: boolean;
}
