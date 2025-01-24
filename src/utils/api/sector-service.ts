import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import axiosServices from "../axios";
import { BASE_URL } from ".";

const API_URL = BASE_URL + '/admin/sector';

export const sectorService = {
  fetchSectors: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data.data
  },

  fetchSectorById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  createSector: async (sector: ISector) => {
    const response = await axiosServices.post(API_URL, sector);
    return response.data.data;
  },

  updateSector: async (id: string, sector: Partial<ISector>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, sector);
    return response.data.data;
  },

  deleteSector: async (id: string) => {
    await axiosServices.delete(`${API_URL}/${id}`);
    return id;
  },
};