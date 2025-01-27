import axiosServices from "../axios";
import { IDeposit } from "@/app/(DashboardLayout)/types/apps/deposit";

const API_URL = '/admin/deposit';

export const depositService = {
  fetchDeposits: async (page: number, limit: number, search?: string) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}&&search=${search}`);
    return response
  },

  fetchDepositById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },

  createDeposit: async (deposit: IDeposit) => {
    const response = await axiosServices.post(API_URL, deposit);
    return response;
  },

  updateDeposit: async (id: string, deposit: Partial<IDeposit>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, deposit);
    return response;
  },

  deleteDeposit: async (id: string) => {
    const data = await axiosServices.delete(`${API_URL}/${id}`);
    return data;
  },
};
