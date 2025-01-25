import { ICompany, ICompanyFull } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { IServerError, IServerResponse } from "@/app/(DashboardLayout)/types/apps/error";
import { companyService } from "@/utils/api/company-service";
const API_URL = + "/admin/company";

export async function fetchCompanies(page: number, limit: number): Promise<
    IServerResponse<{
        data: ICompanyFull[];
        totalPage: number;
    }>
> {
    try {
        const response = await companyService.fetchCompanies(page, limit);
        return { data: response.data.data, totalPage: response.data.totalPage };
    } catch (error: any) {
        console.error("Error fetching companies:", error);
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
        return { data: response }
    } catch (error: any) {
        console.error("Error fetching companies:", error);
        return handleErrorResponse(error);
    }
}

export async function searchCompanies(
    page: number,
    limit: number,
    search: string
): Promise<
    IServerResponse<{
        data: ICompany[];
        totalPage: number;
    }>
> {
    try {
        const response = await companyService.searchCompanies(page, limit, search);
        console.log("Response", response)

        return { data: response.data.data.data, totalPage: response.data.data.totalPage };
    } catch (error: any) {
        console.error("Error searching companies:", error);
        return handleErrorResponse(error);
    }
}

export async function fetchCompanyById(id: string): Promise<IServerResponse<ICompanyFull>> {
    try {
        const response = await companyService.fetchCompanyById(id);
        console.log("Response", response)
        return response;

    } catch (error: any) {
        console.error("Error fetching company by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function deleteCompanyById(id: string): Promise<IServerResponse<string>> {
    try {
        const response = await companyService.deleteCompanyById(id);
        console.log("Response", response)

        return response;

    } catch (error: any) {
        console.error("Error deleting company by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function createCompanyAction(company: ICompanyFull): Promise<IServerResponse<ICompanyFull>> {
    try {
        const response = await companyService.createCompany(company);
        console.log("Response", response)
        return response;

    } catch (error: any) {
        console.error("Error creating company:", error);
        return handleErrorResponse(error);
    }
}

export async function updateCompany(
    id: string,
    company: Partial<ICompanyFull>
): Promise<IServerResponse<ICompanyFull>> {
    try {
        const response = await companyService.updateCompany(id, company);
        console.log("Response", response)
        return response;
    } catch (error: any) {
        console.error("Error updating company:", error);
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
