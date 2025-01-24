import axiosServices from "../axios";
import { IPerformance } from "@/app/(DashboardLayout)/types/apps/peformance";

const API_URL = '/admin/performance';

export const PerformanceService = {
  fetchPerformances: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  fetchPerformanceById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  createPerformance: async (Performance: IPerformance) => {
    const response = await axiosServices.post(API_URL, Performance);
    return response.data.data;
  },

  updatePerformance: async (id: string, Performance: Partial<IPerformance>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, Performance);
    return response.data.data;
  },

  deletePerformance: async (id: string) => {
    await axiosServices.delete(`${API_URL}/${id}`);
    return id;
  },
};
