export interface INews {
    _id?:string
    title: string;
    link: string;
    type: string;
    image?: string;
    companyId?: string;
    updatedAt?: Date;
  }
