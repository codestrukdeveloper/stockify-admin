export interface ICategory {
    _id?:string
    name: string;
    slug: string;
    description: string;
}
export interface IBlog {
    _id?:string
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: string;
    categories: ICategory[];
    tags: string[];
    featuredImage: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    status: string;
    publishedAt: Date;
    relatedStocks?: string[];
    updatedAt?: Date;
  }
