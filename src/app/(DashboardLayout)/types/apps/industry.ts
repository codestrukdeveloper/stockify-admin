export interface BaseEntity {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type IIndustry = BaseEntity;
export type ISector = BaseEntity;
export type GenderList = BaseEntity;
export type IDhrps = BaseEntity;
export type IPerformance = BaseEntity;
export type ICategory = BaseEntity;
