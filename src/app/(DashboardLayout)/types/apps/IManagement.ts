
export interface IManagement {
    _id?:string; 
    name: string;
    position: string;
    companyId: string;
    avatar?:string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}