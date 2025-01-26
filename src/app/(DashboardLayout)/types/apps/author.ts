export interface BaseEntity {
    _id?: string;
    name: string;
    bio: string;
    image: string;
    socialLinks: [
        {
            twitter: string;
            linkedin: string;
        }
    ];
    createdAt?: Date;
    updatedAt?: Date;
  }
export type IAuthor = BaseEntity;
