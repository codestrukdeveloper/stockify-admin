import { INews } from "@/app/(DashboardLayout)/types/apps/INews";
import { IServerError, IServerResponse } from "@/app/(DashboardLayout)/types/apps/error";
import { newsService } from "@/utils/api/news-service";
import { companyService } from "@/utils/api/company-service";
const API_URL = + "/admin/news";

export async function fetchNewss(page: number, limit: number,search:string=""): Promise<
    IServerResponse<{
        data: INews[];
        totalPage: number;
    }>
> {
    try {
        const response = await newsService.fetchNewss(page, limit);
        console.log("Response",response.data.data);
        return { data: response.data.data.data, totalPage: response.data.data.totalPage };
    } catch (error: any) {
        console.error("Error fetching newss:", error);
        return handleErrorResponse(error);
    }
};


export async function uploadImages(folderType: string, file: File[]): Promise<
    IServerResponse<{
        data: string[];
    }>
> {
    try {
        const response = await companyService.uploadImage(folderType, file);
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching newss:", error);
        return handleErrorResponse(error);
    }
}

export async function searchNewss(
    page: number,
    limit: number,
    search: string
): Promise<
    IServerResponse<{
        data: INews[];
        totalPage: number;
    }>
> {
    try {
        const response = await newsService.searchNewss(page, limit, search);
        console.log("Response", response)

        return { data: response.data.data.data, totalPage: response.data.data.totalPage };
    } catch (error: any) {
        console.error("Error searching newss:", error);
        return handleErrorResponse(error);
    }
}

export async function fetchNewsById(id: string): Promise<IServerResponse<INews>> {
    try {
        const response = await newsService.fetchNewsById(id);
        console.log("Response Slug", response)
        return response.data.data;

    } catch (error: any) {
        console.error("Error fetching news by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function deleteNewsById(id: string): Promise<IServerResponse<string>> {
    try {
        const response = await newsService.deleteNewsById(id);
        console.log("Response", response)

        return response;

    } catch (error: any) {
        console.error("Error deleting news by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function createNewsAction(news: INews): Promise<IServerResponse<INews>> {
    try {
        const response = await newsService.createNews(news);
        console.log("Response news", response)
        return response;

    } catch (error: any) {
        console.error("Error creating news:", error);
        return handleErrorResponse(error);
    }
}

export async function updateNews(
    id: string,
    news: Partial<INews>
): Promise<IServerResponse<INews>> {
    try {
        const response = await newsService.updateNews(id, news);
        console.log("Response", response)
        return response;
    } catch (error: any) {
        console.error("Error updating news:", error);
        return handleErrorResponse(error);
    }
}

// Helper function to handle errors and return standardized error responses
function handleErrorResponse(error: any): IServerResponse<any> {
    return {
        error: {
            message: error.response?.data?.message || "An error occurred",
            errors: error?.response?.data?.errors || [],
        },
    };
}
