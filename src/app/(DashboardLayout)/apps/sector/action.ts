import { sectorService } from "@/utils/api/sector-service";
import { IServerResponse } from "../../types/apps/error";
import { ISector } from "../../types/apps/sector";

// Fetch sectors
export async function fetchSectors(page:number,limit:number): Promise<IServerResponse<{
    data: ISector[],
    totalPage: number
}>> {
  try {
    const sectors = await sectorService.fetchSectors(page,limit);
    // console.log("sectors",sectors);
    return { data: sectors.data, totalPage: sectors.totalPage };
  } catch (error: any) {
    console.error("Error fetching sectors:", error);
    return {
      error: {
        message: error.response.data.message || "Failed to fetch sectors",
        errors: error.response.data.errors|| "No additional error details provided",
      },
    };
  }
}
