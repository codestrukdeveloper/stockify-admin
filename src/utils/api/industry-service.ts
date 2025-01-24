import { IIndustry } from "@/app/(DashboardLayout)/types/apps/industry";
import axiosServices from "../axios";

const API_URL = '/admin/industry';

export const industryService = {
  fetchIndustries: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  fetchIndustryById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  createIndustry: async (industry: IIndustry) => {
    const response = await axiosServices.post(API_URL, industry);
    return response.data.data;
  },

  updateIndustry: async (id: string, industry: Partial<IIndustry>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, industry);
    return response.data.data;
  },

  deleteIndustry: async (id: string) => {
    await axiosServices.delete(`${API_URL}/${id}`);
    return id;
  },
};
