
export interface IPriceTrend  {
    _id?:string;
    price: number;
    label: string;
    period: Date;
    companyId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    isDeleted?: boolean;
}
