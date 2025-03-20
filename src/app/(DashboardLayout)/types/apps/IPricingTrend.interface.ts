
export interface IPriceTrend  {
    _id?:string;
    price: string;
    period: string;
    label: string;
    date?:Date;
    companyId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    isDeleted?: boolean;
}
