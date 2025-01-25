import { IAuthor } from "@/app/(DashboardLayout)/types/apps/author";
import axiosServices from "../axios";

const API_URL = '/admin/author';

export const authorService = {
  fetchAuthors: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  fetchAuthorById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response.data.data;
  },

  createAuthor: async (author: IAuthor) => {
    const response = await axiosServices.post(API_URL, author);
    return response.data.data;
  },

  updateAuthor: async (id: string, author: Partial<IAuthor>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, author);
    return response.data.data;
  },

  deleteAuthor: async (id: string) => {
    await axiosServices.delete(`${API_URL}/${id}`);
    return id;
  },
};
