import { industryService } from "@/utils/api/industry-service";
import { IServerResponse } from "../../types/apps/error";
import { IIndustry } from "../../types/apps/industry";

export async function fetchIndustries(page:number,limit:number): Promise<IServerResponse<{
    data:IIndustry[],
    totalPage:number
}>> {
  try {
    const industries = await industryService.fetchIndustries(page,limit);
    // console.log("industrued",industries);
    return { data: industries.data,totalPage:industries.totalPage }; 
  } catch (error: any) {
    console.error("Error fetching industries:", error);
    return {
      error: {
        message: error.response.data.message || "Failed to fetch industries",
        errors: error.response.data.errors|| "No additional error details provided",
      },
    };
  }
}
