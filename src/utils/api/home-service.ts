import { IHome } from "@/app/(DashboardLayout)/types/apps/home";
import axiosServices from "../axios";

const API_URL = '/admin/home';

export const homeService = {
  fetchHome: async () => {
    const response = await axiosServices.get(`${API_URL}`);
    return response;
  },

  fetchHomeById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },

  createHome: async (home: IHome) => {
    const response = await axiosServices.post(API_URL, home);
    return response;
  },

  updateHome: async (id: string, home: Partial<IHome>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, home);
    return response;
  },

  deleteHome: async (id: string,companyId:string) => {
  const data=  await axiosServices.delete(`${API_URL}/${id}/company/${companyId}`);
    return data;
  },
};
