import axiosServices from "../axios";
import { IPerformance } from "@/app/(DashboardLayout)/types/apps/peformance";

const API_URL = '/admin/performance';

export const PerformanceService = {
  fetchPerformances: async (page: number, limit: number, search?: string) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}&&search=${search}`);
    return response;
  },

  fetchPerformanceById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },

  createPerformance: async (Performance: IPerformance) => {
    const response = await axiosServices.post(API_URL, Performance);
    return response;
  },

  updatePerformance: async (id: string, Performance: Partial<IPerformance>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, Performance);
    return response;
  },

  deletePerformance: async (id: string) => {
    const data = await axiosServices.delete(`${API_URL}/${id}`);
    return data;
  },
};
