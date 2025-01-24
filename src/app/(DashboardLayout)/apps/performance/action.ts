"use server"
import { PerformanceService } from "@/utils/api/performance-service";
import { IServerResponse } from "../../types/apps/error";
import { IPerformance } from "../../types/apps/peformance";

export async function fetchPerformances(pageNo: number, limit: number): Promise<IServerResponse<{
    data: IPerformance[],
    totalPage: number
}>> {
    try {
        const fetchPerformances = await PerformanceService.fetchPerformances(pageNo, limit);
        return fetchPerformances;
    } catch (error: any) {
        console.error("Error fetching performance categories:", error);
        return {
            error: {
                message: error.response.data.message || "Failed to fetch performance categories",
                errors: error.response.data.errors
            }
        };
    }
}
