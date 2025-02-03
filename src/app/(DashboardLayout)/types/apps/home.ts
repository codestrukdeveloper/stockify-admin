export interface BaseEntity {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICompany extends BaseEntity {
  _id: string;
  slug: string;
  ticker: string;
  logo: string;
  sector: string;
  industry: string;
  price: number;
  ipoPrice: string;
  ipoDate: string;
}
// Enum for Home Sections
export enum HomeEnum {
  LISTED = "listed",
  UN_LISTED = "un_listed",
  IPO = "ipo"
}


export interface ICategory {
  _id: HomeEnum; // Use HomeEnum for the _id
  companies: ICompany[];
}

export interface IBlog {
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
}

export interface IHome {
  data: [
    {
      _id: HomeEnum; // Use HomeEnum for the _id instead of the string literals
      companies: ICompany[];
    }
  ];
}

