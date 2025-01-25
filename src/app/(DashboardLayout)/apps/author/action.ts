import { authorService } from "@/utils/api/author-service";
import { IServerResponse } from "../../types/apps/error";
import { IAuthor } from "../../types/apps/author";

export async function fetchAuthors(page:number,limit:number): Promise<IServerResponse<{
    data:IAuthor[],
    totalPage:number
}>> {
  try {
    const authors = await authorService.fetchAuthors(page,limit);
     console.log("authors",authors);
    return { data: authors.data,totalPage:authors.totalPage }; 
  } catch (error: any) {
    console.error("Error fetching authors:", error);
    return {
      error: {
        message: error.response.data.message || "Failed to fetch authors",
        errors: error.response.data.errors|| "No additional error details provided",
      },
    };
  }
}
