"use server";
import { ICompany, ICompanyFull, ICompanyFullExtended } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { IServerError, IServerResponse } from "@/app/(DashboardLayout)/types/apps/error";
import { companyService } from "@/utils/api/company-service";
import { handleErrorResponse } from "../../action";
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
        return response.data.data;;
    } catch (error: any) {
        console.error("Error searching companies:", error);
        return handleErrorResponse(error);
    }
}

export async function fetchCompanyById(id: string): Promise<IServerResponse<ICompanyFullExtended>> {
    try {
        const response = await companyService.fetchCompanyById(id);
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching company by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function deleteCompanyById(id: string): Promise<IServerResponse<string>> {
    try {
        const response = await companyService.deleteCompanyById(id);
        return response;
    } catch (error: any) {
        console.error("Error deleting company by ID:", error);
        return handleErrorResponse(error);
    }
}

export async function createCompanyAction(company: ICompanyFullExtended): Promise<IServerResponse<ICompanyFullExtended>> {
    try {
        const response = await companyService.createCompany(company);
        return response.data.data;
    } catch (error: any) {
        console.error("Error creating company:", error.response.data);
        return handleErrorResponse(error);
    }
}

export async function updateCompany(
    id: string,
    company: Partial<ICompanyFullExtended>
): Promise<IServerResponse<ICompanyFull>> {
    try {
        const response = await companyService.updateCompany(id, company);
        // console.log("Response", response.data.data)
        return response.data.data;
    } catch (error: any) {
        console.error("Error updating company:", error);
        return handleErrorResponse(error);
    }
}


export async function updateCompanyLogo(
    id: string,
    logo: string,
    
): Promise<IServerResponse<ICompanyFull>> {
    try {
        const response = await companyService.updateCompanyLogo(id, logo);
        return response.data.data;
    } catch (error: any) {
        console.error("Error updating company:", error);
        return handleErrorResponse(error);
    }
}
// Helper function to handle errors and return standardized error responses
