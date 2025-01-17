export interface BaseEntity {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type IndustryList = BaseEntity;
export type SectorList = BaseEntity;
export type GenderList = BaseEntity;
export type DhrpsList = BaseEntity;
export type DepositList = BaseEntity;
export type PerformanceList = BaseEntity;
export type CategoryList = BaseEntity;
