import { IServerResponse } from "../../types/apps/error";
import { ICategory } from "../../types/apps/category";
import { CategoriesService } from "@/utils/api/categories-service";

// Fetch all categories
export async function fetchCategories(
  page: number,
  limit: number,
  search?: string
): Promise<IServerResponse<{ data: ICategory[]; totalPage: number }>> {
  try {
    const categories = await CategoriesService.fetchCategories(page, limit, search || "");
    return {
      data: categories.data.data.data,
      totalPage: categories.data.data.totalPage,
    };
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch categories",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Fetch a single category by ID
export async function fetchCategoryById(
  id: string
): Promise<IServerResponse<{ data: ICategory }>> {
  try {
    const category = await CategoriesService.fetchCategoriesById(id);
    return { data: category.data.data };
  } catch (error: any) {
    console.error("Error fetching category:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch category",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Create a new category
export async function createCategory(
  category: ICategory
): Promise<IServerResponse<{ data: ICategory }>> {
  try {
    const response = await CategoriesService.createCategories(category);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error creating category:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to create category",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Update a category by ID
export async function updateCategoryById(
  id: string,
  update: Partial<ICategory>
): Promise<IServerResponse<{ data: ICategory }>> {
  try {
    const response = await CategoriesService.updateCategories(id, update);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error updating category:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to update category",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Delete a category by ID
export async function deleteCategory(
  id: string
): Promise<IServerResponse<{ data: ICategory }>> {
  try {
    const response = await CategoriesService.deleteCategories(id);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to delete category",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}