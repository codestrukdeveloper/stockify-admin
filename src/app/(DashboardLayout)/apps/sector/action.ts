import { sectorService } from "@/utils/api/sector-service";
import { IServerResponse } from "../../types/apps/error";
import { ISector } from "../../types/apps/sector";

// Fetch sectors
export async function fetchSectors(page: number, limit: number, search?: string): Promise<IServerResponse<{
  data: ISector[],
  totalPage: number
}>> {
  try {
    const sectors = await sectorService.fetchSectors(page, limit,search||"");
    console.log("sectors",sectors.data.data.data,sectors.data.data.totalPage);
    return { data: sectors.data.data.data, totalPage: sectors.data.data.totalPage };
  } catch (error: any) {
    console.error("Error fetching sectors:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to fetch sectors",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}



export async function fetchSectorById(id: string): Promise<IServerResponse<{
  data: ISector,
}>> {
  try {
    const sectors = await sectorService.fetchSectorById(id);
    // console.log("sectors",sectors);
    return { data: sectors.data.data };
  } catch (error: any) {
    console.error("Error fetching sectors:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to fetch sectors",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}


export async function updateSectorById(id: string, update: Partial<ISector>): Promise<IServerResponse<{
  data: ISector,
}>> {
  try {
    const sectors = await sectorService.updateSector(id, update);
    // console.log("sectors",sectors);
    return { data: sectors.data.data };
  } catch (error: any) {
    console.error("Error fetching sectors:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to fetch sectors",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}


export async function deleteSectors(id: string): Promise<IServerResponse<{
  data: ISector,
}>> {
  try {
    const sectors = await sectorService.deleteSector(id);
    // console.log("sectors",sectors);
    return { data: sectors.data.data };
  } catch (error: any) {
    console.error("Error fetching sectors:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to fetch sectors",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

export async function createSector(
  dhrp: ISector
): Promise<IServerResponse<{ data: ISector }>> {
  try {
    const response = await sectorService.createSector(dhrp);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error creating service:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to create service",
        errors: error.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}