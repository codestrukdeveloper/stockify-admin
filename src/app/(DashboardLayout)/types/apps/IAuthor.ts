export interface IAuthor {
    _id?: string;
    name: string;
    bio: string;
    image: string;
    socialLinks?: [
        {
            twitter: string;
            linkedin: string;
        }
    ];
    createdAt?: Date;
    updatedAt?: Date;
  }
