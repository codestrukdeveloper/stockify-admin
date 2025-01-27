import { IDhrp } from "@/app/(DashboardLayout)/types/apps/IDhrp";
import axiosServices from "../axios";

const API_URL = '/admin/dhrps';

export const dhrpService = {
  fetchDhrps: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response;
  },

  fetchDhrpById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },

  createDhrp: async (dhrp: IDhrp) => {
    const response = await axiosServices.post(API_URL, dhrp);
    return response;
  },

  updateDhrp: async (id: string, dhrp: Partial<IDhrp>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, dhrp);
    return response;
  },

  deleteDhrp: async (id: string) => {
const data=    await axiosServices.delete(`${API_URL}/${id}`);
    return data;
  },
};
