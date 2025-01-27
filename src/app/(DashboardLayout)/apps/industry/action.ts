import { industryService } from "@/utils/api/industry-service";
import { IServerResponse } from "../../types/apps/error";
import { IIndustry } from "../../types/apps/industry";

// Fetch industries
export async function fetchIndustries(
  page: number,
  limit: number,
  search?: string
): Promise<IServerResponse<{ data: IIndustry[]; totalPage: number }>> {
  try {
    const industries = await industryService.fetchIndustries(page, limit, search || "");
    console.log("industries", industries.data.data.data, industries.data.data.totalPage);
    return { data: industries.data.data.data, totalPage: industries.data.data.totalPage };
  } catch (error: any) {
    console.error("Error fetching industries:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to fetch industries",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Fetch industry by ID
export async function fetchIndustryById(
  id: string
): Promise<IServerResponse<{ data: IIndustry }>> {
  try {
    const industry = await industryService.fetchIndustryById(id);
    return { data: industry.data.data };
  } catch (error: any) {
    console.error("Error fetching industry:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to fetch industry",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Update industry by ID
export async function updateIndustryById(
  id: string,
  update: Partial<IIndustry>
): Promise<IServerResponse<{ data: IIndustry }>> {
  try {
    const industry = await industryService.updateIndustry(id, update);
    return { data: industry.data.data };
  } catch (error: any) {
    console.error("Error updating industry:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to update industry",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}


export async function createIndustry(
  update: IIndustry
): Promise<IServerResponse<{ data: IIndustry }>> {
  try {
    const industry = await industryService.createIndustry( update);
    return { data: industry.data.data };
  } catch (error: any) {
    console.error("Error creating industry:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to create industry",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Delete industry by ID
export async function deleteIndustry(
  id: string
): Promise<IServerResponse<{ data: IIndustry }>> {
  try {
    const industry = await industryService.deleteIndustry(id);
    return { data: industry.data.data };
  } catch (error: any) {
    console.error("Error deleting industry:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to delete industry",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}