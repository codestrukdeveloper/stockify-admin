import { ICompanyFull } from "@/app/(DashboardLayout)/types/apps/company";
import { BASE_URL } from ".";
import axiosServices from "../axios";
import { IUser } from "@/app/(DashboardLayout)/types/apps/users";

const API_URL = '/admin';

export const authService = {
    login: async (email: string, password: string) => {
      const response = await axiosServices.post(`${API_URL}/auth/login`, { email, password });
      return response.data;
    },
  
    register: async (userData: IUser) => {
      const response = await axiosServices.post(`${API_URL}/auth/register`, userData);
      return response.data;
    },
  
    logout: async () => {
      await axiosServices.post(`${API_URL}/auth/logout`);
    },
  
    getLoginDetails: async () => {
      const response = await axiosServices.get(`${API_URL}/auth/me`);
      return response.data;
    },
  };
  