"use server"
import { PerformanceService } from "@/utils/api/performance-service";
import { IServerResponse } from "../../types/apps/error";
import { IPerformance } from "../../types/apps/peformance";
import { depositService } from "@/utils/api/deposits-service";
import { IDeposit } from "../../types/apps/deposit";

export async function fetchDeposits(page: number, limit: number): Promise<IServerResponse<{
    data: IDeposit[],
    totalPage: number
}>> {
    try {
        const Deposits = await depositService.fetchDeposits(page, limit);
        return Deposits;
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
