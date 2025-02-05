import { IVideo } from "@/app/(DashboardLayout)/types/apps/IVideo";
import { IServerError, IServerResponse } from "@/app/(DashboardLayout)/types/apps/error";
import { videoService } from "@/utils/api/video-service";
import { companyService } from "@/utils/api/company-service";
const API_URL = + "/admin/video";

export async function fetchVideos(page: number, limit: number): Promise<
    IServerResponse<{
        data: IVideo[];
        totalPage: number;
    }>
> {
    try {
        const response = await videoService.fetchVideos(page, limit);
        console.log("Response",response.data.data);
        return { data: response.data.data.data, totalPage: response.data.data.totalPage };
    } catch (error: any) {
        console.error("Error fetching videos:", error);
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
        console.error("Error fetching videos:", error);
        return handleErrorResponse(error);
    }
}

export async function searchVideos(
    page: number,
    limit: number,
    search: string
): Promise<
    IServerResponse<{
        data: IVideo[];
        totalPage: number;
    }>
> {
    try {
        const response = await videoService.searchVideos(page, limit, search);
        console.log("Response", response)

        return { data: response.data.data.data, totalPage: response.data.data.totalPage };
    } catch (error: any) {
        console.error("Error searching videos:", error);
        return handleErrorResponse(error);
    }
}

export async function fetchVideoById(id: string): Promise<IServerResponse<IVideo>> {
    try {
        const response = await videoService.fetchVideoById(id);
        console.log("Response Slug", response)
        return response.data.data;

    } catch (error: any) {
        console.error("Error fetching video by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function deleteVideoById(id: string): Promise<IServerResponse<string>> {
    try {
        const response = await videoService.deleteVideoById(id);
        console.log("Response", response)

        return response;

    } catch (error: any) {
        console.error("Error deleting video by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function createVideoAction(video: IVideo): Promise<IServerResponse<IVideo>> {
    try {
        const response = await videoService.createVideo(video);
        console.log("Response video", response)
        return response;

    } catch (error: any) {
        console.error("Error creating video:", error);
        return handleErrorResponse(error);
    }
}

export async function updateVideo(
    id: string,
    video: Partial<IVideo>
): Promise<IServerResponse<IVideo>> {
    try {
        const response = await videoService.updateVideo(id, video);
        console.log("Response", response)
        return response;
    } catch (error: any) {
        console.error("Error updating video:", error);
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
