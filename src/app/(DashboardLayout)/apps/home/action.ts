import { homeService } from "@/utils/api/home-service";
import { IServerResponse } from "../../types/apps/error";
import { IHome } from "../../types/apps/home";

// Fetch home
export async function fetchHome(): Promise<IServerResponse<{ data: IHome; totalPage: number }>> {
  try {
    const home = await homeService.fetchHome();
    console.log("home", home.data.data, home.data.data.totalPage);
    return { data: home.data.data, totalPage: home.data.data.totalPage };
  } catch (error: any) {
    console.error("Error fetching home:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to fetch home",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Fetch home by ID
export async function fetchHomeById(
  id: string
): Promise<IServerResponse<{ data: IHome }>> {
  try {
    const home = await homeService.fetchHomeById(id);
    return { data: home.data.data };
  } catch (error: any) {
    console.error("Error fetching home:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to fetch home",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Update home by ID
export async function updateHomeById(
  id: string,
  update: Partial<IHome>
): Promise<IServerResponse<{ data: IHome }>> {
  try {
    const home = await homeService.updateHome(id, update);
    return { data: home.data.data };
  } catch (error: any) {
    console.error("Error updating home:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to update home",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}


export async function createHome(
  update: IHome
): Promise<IServerResponse<{ data: IHome }>> {
  try {
    const home = await homeService.createHome( update);
    return { data: home.data.data };
  } catch (error: any) {
    console.error("Error creating home:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to create home",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}

// Delete home by ID
export async function deleteHome(
  id: string,
  companyId: string
): Promise<IServerResponse<{ data: IHome }>> {
  try {
    const home = await homeService.deleteHome(id,companyId);
    return { data: home.data.data };
  } catch (error: any) {
    console.error("Error deleting home:", error);
    return {
      error: {
        message: error?.response?.data?.message || "Failed to delete home",
        errors: error?.response?.data?.errors || ["No additional error details provided"],
      },
    };
  }
}