"use server";

import { depositService } from "@/utils/api/deposits-service";
import { IServerResponse } from "../../types/apps/error";
import { IDeposit } from "../../types/apps/deposit";

// Fetch deposits
export async function fetchDeposits(
  page: number,
  limit: number,
  search?: string
): Promise<IServerResponse<{ data: IDeposit[]; totalPage: number }>> {
  try {
    const deposits = await depositService.fetchDeposits(page, limit, search || "");
    console.log("deposits", deposits.data.data.data, deposits.data.data.totalPage);
    return { data: deposits.data.data.data, totalPage: deposits.data.data.totalPage };
  } catch (error: any) {
    console.error("Error fetching deposits:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch deposits",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Fetch deposit by ID
export async function fetchDepositById(
  id: string
): Promise<IServerResponse<{ data: IDeposit }>> {
  try {
    const deposit = await depositService.fetchDepositById(id);
    return { data: deposit.data.data };
  } catch (error: any) {
    console.error("Error fetching deposit:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to fetch deposit",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Create deposit
export async function createDeposit(
  deposit: IDeposit
): Promise<IServerResponse<{ data: IDeposit }>> {
  try {
    const response = await depositService.createDeposit(deposit);
    console.log("created",response);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error creating deposit:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to create deposit",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Update deposit by ID
export async function updateDepositById(
  id: string,
  update: Partial<IDeposit>
): Promise<IServerResponse<{ data: IDeposit }>> {
  try {
    const response = await depositService.updateDeposit(id, update);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error updating deposit:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to update deposit",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Delete deposit by ID
export async function deleteDeposit(
  id: string
): Promise<IServerResponse<{ data: IDeposit }>> {
  try {
    const response = await depositService.deleteDeposit(id);
    return { data: response.data.data };
  } catch (error: any) {
    console.error("Error deleting deposit:", error);
    return {
      error: {
        message: error.response?.data?.message || "Failed to delete deposit",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}