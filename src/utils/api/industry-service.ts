import { IIndustry } from "@/app/(DashboardLayout)/types/apps/industry";
import axiosServices from "../axios";

const API_URL = '/admin/industry';

export const industryService = {
  fetchIndustries: async (page: number, limit: number,search?:string) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}&&search=${search}`);
    return response;
  },

  fetchIndustryById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },

  createIndustry: async (industry: IIndustry) => {
    const response = await axiosServices.post(API_URL, industry);
    return response;
  },

  updateIndustry: async (id: string, industry: Partial<IIndustry>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, industry);
    return response;
  },

  deleteIndustry: async (id: string) => {
  const data=  await axiosServices.delete(`${API_URL}/${id}`);
    return data;
  },
};
