import { IServerError, IServerResponse } from "@/app/(DashboardLayout)/types/apps/error";
import { IDhrps } from "@/app/(DashboardLayout)/types/apps/industry";
import { dhrpService } from "@/utils/api/dhrp-service";

export async function fetchDhrp(pageNo: number, limit: number): Promise<IServerResponse<{
  data: IDhrps[],
  totalPage: number
}>> {
  try {
    const categories = await dhrpService.fetchDhrps(pageNo, limit);
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
