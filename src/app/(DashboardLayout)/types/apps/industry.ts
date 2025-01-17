export interface BaseEntity {
     id: number;
     name: string;
     is_deleted: boolean;
     date: string;
   }
   
   export type IndustryList = BaseEntity;
   export type SectorList = BaseEntity;
   export type GenderList = BaseEntity;
   export type DhrpsList = BaseEntity;
   export type DepositList = BaseEntity;
   export type PerformanceList = BaseEntity;
   export type CategoryList = BaseEntity;
   