import { authorService } from "@/utils/api/author-service";
import { IServerResponse } from "../../types/apps/error";
import { IAuthor } from "../../types/apps/IAuthor";

// Fetch all authors
export async function fetchAuthors(
  page: number,
  limit: number,
  search?: string
): Promise<IServerResponse<{ data: IAuthor[]; totalPage: number }>> {
  try {
    const authors = await authorService.fetchAuthors(page, limit);
    return {
      data: authors.data.data.data,
      totalPage: authors.data.data.totalPage,
    };
  } catch (error: any) {
    console.error("Error fetching authors:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch authors",
        errors: error.response?.data?.errors || "No additional error details provided",
      },
    };
  }
}

// Fetch a single author by ID
export async function fetchAuthorById(
  id: string
): Promise<IServerResponse<{ data: IAuthor }>> {
  try {
    const author = await authorService.fetchAuthorById(id);
    return { data: author.data.data };
  } catch (error: any) {
    console.error("Error fetching author:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch author",
        errors: error.response?.data?.errors || "No additional error details provided",
      },
    };
  }
}

// Create a new author
export async function createAuthor(
  author: IAuthor
): Promise<IServerResponse<{ data: IAuthor }>> {
  try {
    const response = await authorService.createAuthor(author);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error creating author:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to create author",
        errors: error.response?.data?.errors || "No additional error details provided",
      },
    };
  }
}

// Update an author by ID
export async function updateAuthorById(
  id: string,
  update: Partial<IAuthor>
): Promise<IServerResponse<{ data: IAuthor }>> {
  try {
    const response = await authorService.updateAuthor(id, update);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error updating author:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to update author",
        errors: error.response?.data?.errors || "No additional error details provided",
      },
    };
  }
}

// Delete an author by ID
export async function deleteAuthor(
  id: string
): Promise<IServerResponse<{ data: IAuthor }>> {
  try {
    const response = await authorService.deleteAuthor(id);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error deleting author:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to delete author",
        errors: error.response?.data?.errors || "No additional error details provided",
      },
    };
  }
}