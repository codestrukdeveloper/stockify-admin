import axiosServices from "../axios";
import { ICategory } from "@/app/(DashboardLayout)/types/apps/category";

const API_URL = '/admin/category';

export const CategoriesService = {
  fetchCategories: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  fetchCategoriesById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  createCategories: async (Categories: ICategory) => {
    const response = await axiosServices.post(API_URL, Categories);
    return response.data.data;
  },

  updateCategories: async (id: string, Categories: Partial<ICategory>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, Categories);
    return response.data.data;
  },

  deleteCategories: async (id: string) => {
    await axiosServices.delete(`${API_URL}/${id}`);
    return id;
  },
};
