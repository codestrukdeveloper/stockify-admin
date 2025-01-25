import { ICompanyFull, ICompanyFullCreate } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { BASE_URL } from ".";
import axiosServices from "../axios";

const API_URL = BASE_URL+'/admin/company';

export const companyService = {
  fetchCompanies: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  uploadImage: async (folder: string, files: File[]) => {
    const formData = new FormData();
  
    files.forEach(file => {
      formData.append("files", file);
    });
  
    formData.append("folder", folder);
  
    const response = await axiosServices.post(`${BASE_URL}/admin/upload`, formData);
    return response.data;
  },
  

  searchCompanies: async (page: number, limit: number, search: string) => {
    const response = await axiosServices.get(
      `${API_URL}?page=${page}&limit=${limit}&search=${search}&searchName=${search}`
    );
    return response;
  },

  fetchCompanyById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response.data.data;
  },
  deleteCompanyById: async (id: string) => {
    const response = await axiosServices.delete(`${API_URL}/${id}`);
    return response.data.data;
  },

  createCompany: async (company: ICompanyFullCreate) => {
    const response = await axiosServices.post(API_URL+"/new", company);
    return response;
  },
  updateCompany: async (id:string, company: Partial<ICompanyFull>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, company);
    return response;
  },
  updateCompanyLogo: async (id:string, logo: string) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, {logo});
    return response;
  },
};
