import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import axiosServices from "../axios";
import { BASE_URL } from ".";

const API_URL ='/admin/sector';

export const sectorService = {
  fetchSectors: async (page: number, limit: number,search:string) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}&&search=${search}`);
    return response
  },

  fetchSectorById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },

  createSector: async (sector: ISector) => {
    const response = await axiosServices.post(API_URL, sector);
    return response;
  },

  updateSector: async (id: string, sector: Partial<ISector>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, sector);
    return response;
  },

  deleteSector: async (id: string) => {
  const data=  await axiosServices.delete(`${API_URL}/${id}`);
    return data;
  },
};