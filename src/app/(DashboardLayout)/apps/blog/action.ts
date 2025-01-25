import { IBlog } from "@/app/(DashboardLayout)/types/apps/IBlog";
import { IServerError, IServerResponse } from "@/app/(DashboardLayout)/types/apps/error";
import { blogService } from "@/utils/api/blog-service";
const API_URL = + "/admin/blog";

export async function fetchBlogs(page: number, limit: number): Promise<
    IServerResponse<{
        data: IBlog[];
        totalPage: number;
    }>
> {
    try {
        const response = await blogService.fetchBlogs(page, limit);
        return { data: response.data.data, totalPage: response.data.totalPage };
    } catch (error: any) {
        console.error("Error fetching blogs:", error);
        return handleErrorResponse(error);
    }
};


export async function uploadImages(folderType: string, file: File[]): Promise<
    IServerResponse<{
        data: string[];
    }>
> {
    try {
        const response = await blogService.uploadImage(folderType, file);
        return { data: response }
    } catch (error: any) {
        console.error("Error fetching blogs:", error);
        return handleErrorResponse(error);
    }
}

export async function searchBlogs(
    page: number,
    limit: number,
    search: string
): Promise<
    IServerResponse<{
        data: IBlog[];
        totalPage: number;
    }>
> {
    try {
        const response = await blogService.searchBlogs(page, limit, search);
        console.log("Response", response)

        return { data: response.data.data.data, totalPage: response.data.data.totalPage };
    } catch (error: any) {
        console.error("Error searching blogs:", error);
        return handleErrorResponse(error);
    }
}

export async function fetchBlogById(id: string): Promise<IServerResponse<IBlog>> {
    try {
        const response = await blogService.fetchBlogById(id);
        console.log("Response", response)
        return response;

    } catch (error: any) {
        console.error("Error fetching blog by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function deleteBlogById(id: string): Promise<IServerResponse<string>> {
    try {
        const response = await blogService.deleteBlogById(id);
        console.log("Response", response)

        return response;

    } catch (error: any) {
        console.error("Error deleting blog by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function createBlogAction(blog: IBlog): Promise<IServerResponse<IBlog>> {
    try {
        const response = await blogService.createBlog(blog);
        console.log("Response", response)
        return response;

    } catch (error: any) {
        console.error("Error creating blog:", error);
        return handleErrorResponse(error);
    }
}

export async function updateBlog(
    id: string,
    blog: Partial<IBlog>
): Promise<IServerResponse<IBlog>> {
    try {
        const response = await blogService.updateBlog(id, blog);
        console.log("Response", response)
        return response;
    } catch (error: any) {
        console.error("Error updating blog:", error);
        return handleErrorResponse(error);
    }
}

// Helper function to handle errors and return standardized error responses
function handleErrorResponse(error: any): IServerResponse<any> {
    return {
        error: {
            message: error.response?.data?.message || "An error occurred",
            errors: error.response?.data?.errors || [],
        },
    };
}
