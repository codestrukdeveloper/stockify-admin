
export interface IShareholder{
    _id?:string;
    name: string;
    percent: string;
    companyId?: string;
    avatar?:string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
