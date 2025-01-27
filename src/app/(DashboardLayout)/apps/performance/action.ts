"use server";

import { PerformanceService } from "@/utils/api/performance-service";
import { IServerResponse } from "../../types/apps/error";
import { IPerformance } from "../../types/apps/peformance";

// Fetch performances
export async function fetchPerformances(
  pageNo: number,
  limit: number,
  search?: string
): Promise<IServerResponse<{ data: IPerformance[]; totalPage: number }>> {
  try {
    const performances = await PerformanceService.fetchPerformances(pageNo, limit, search || "");
    console.log("performances", performances.data.data, performances.data.data.totalPage);
    return { data: performances.data.data.data, totalPage: performances.data.data.totalPage };
  } catch (error: any) {
    console.error("Error fetching performances:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch performances",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Fetch performance by ID
export async function fetchPerformanceById(
  id: string
): Promise<IServerResponse<{ data: IPerformance }>> {
  try {
    const performance = await PerformanceService.fetchPerformanceById(id);
    return { data: performance.data.data };
  } catch (error: any) {
    console.error("Error fetching performance:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch performance",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Create performance
export async function createPerformance(
  performance: IPerformance
): Promise<IServerResponse<{ data: IPerformance }>> {
  try {
    const response = await PerformanceService.createPerformance(performance);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error creating performance:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to create performance",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Update performance by ID
export async function updatePerformanceById(
  id: string,
  update: Partial<IPerformance>
): Promise<IServerResponse<{ data: IPerformance }>> {
  try {
    const response = await PerformanceService.updatePerformance(id, update);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error updating performance:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to update performance",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Delete performance by ID
export async function deletePerformance(
  id: string
): Promise<IServerResponse<{ data: IPerformance }>> {
  try {
    const response = await PerformanceService.deletePerformance(id);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error deleting performance:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to delete performance",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}