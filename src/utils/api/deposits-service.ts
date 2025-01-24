import axiosServices from "../axios";
import { IDeposit } from "@/app/(DashboardLayout)/types/apps/deposit";

const API_URL =  '/admin/deposit';

export const depositService = {
  fetchDeposits: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data.data
  },

  fetchDepositById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  createDeposit: async (deposit: IDeposit) => {
    const response = await axiosServices.post(API_URL, deposit);
    return response.data.data;
  },

  updateDeposit: async (id: string, deposit: Partial<IDeposit>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, deposit);
    return response.data.data;
  },

  deleteDeposit: async (id: string) => {
    await axiosServices.delete(`${API_URL}/${id}`);
    return id;
  },
};
