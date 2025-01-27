import axiosServices from "../axios";
import { ICategory } from "@/app/(DashboardLayout)/types/apps/category";

const API_URL = '/admin/category';

export const CategoriesService = {
  fetchCategories: async (page: number, limit: number,search:string="") => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}&&search=${search}`);
    return response;
  },

  fetchCategoriesById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },

  createCategories: async (Categories: ICategory) => {
    const response = await axiosServices.post(API_URL, Categories);
    return response;
  },

  updateCategories: async (id: string, Categories: Partial<ICategory>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, Categories);
    return response;
  },

  deleteCategories: async (id: string) => {
    const data = await axiosServices.delete(`${API_URL}/${id}`);
    return data;
  },
};
