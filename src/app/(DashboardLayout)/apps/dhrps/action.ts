import { dhrpService } from "@/utils/api/dhrp-service";
import { IServerResponse } from "../../types/apps/error";
import { IDhrp } from "../../types/apps/IDhrp";

// Fetch DHRPs
export async function fetchDhrps(
  page: number,
  limit: number,
  search?: string
): Promise<IServerResponse<{ data: IDhrp[]; totalPage: number }>> {
  try {
    const dhrps = await dhrpService.fetchDhrps(page, limit);
    console.log("dhrps", dhrps.data.data.data, dhrps.data.data.totalPage);
    return { data: dhrps.data.data.data, totalPage: dhrps.data.data.totalPage };
  } catch (error: any) {
    console.error("Error fetching DHRPs:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch DHRPs",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Fetch DHRP by ID
export async function fetchDhrpById(
  id: string
): Promise<IServerResponse<{ data: IDhrp }>> {
  try {
    const dhrp = await dhrpService.fetchDhrpById(id);
    return { data: dhrp.data.data };
  } catch (error: any) {
    console.error("Error fetching DHRP:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch DHRP",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Create DHRP
export async function createDhrp(
  dhrp: IDhrp
): Promise<IServerResponse<{ data: IDhrp }>> {
  try {
    const response = await dhrpService.createDhrp(dhrp);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error creating DHRP:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to create DHRP",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Update DHRP by ID
export async function updateDhrpById(
  id: string,
  update: Partial<IDhrp>
): Promise<IServerResponse<{ data: IDhrp }>> {
  try {
    const response = await dhrpService.updateDhrp(id, update);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error updating DHRP:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to update DHRP",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Delete DHRP by ID
export async function deleteDhrp(
  id: string
): Promise<IServerResponse<{ data: IDhrp }>> {
  try {
    const response = await dhrpService.deleteDhrp(id);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error deleting DHRP:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to delete DHRP",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}