import { ICategory } from "@/app/(DashboardLayout)/types/apps/category";
import { IServerError, IServerResponse } from "@/app/(DashboardLayout)/types/apps/error";
import { CategoriesService } from "@/utils/api/categories-service";

export async function fetchCategories(pageNo: number, limit: number): Promise<IServerResponse<{
  data: ICategory[],
  totalPage: number
}>> {
  try {
    const categories = await CategoriesService.fetchCategories(pageNo, limit);
    return { data: categories.data, totalPage: categories.totalPage };
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return {
      error: {
        message: error.response.data.message || error.response || "Failed to fetch categories",
        errors: error.response.data.errors || "No additional error details provided",
      },
    };
  }
}
