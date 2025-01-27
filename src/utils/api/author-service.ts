import { IAuthor } from "@/app/(DashboardLayout)/types/apps/IAuthor";
import axiosServices from "../axios";

const API_URL = '/admin/author';

export const authorService = {
  fetchAuthors: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response;
  },

  fetchAuthorById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },

  createAuthor: async (author: IAuthor) => {
    const response = await axiosServices.post(API_URL, author);
    return response;
  },

  updateAuthor: async (id: string, author: Partial<IAuthor>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, author);
    return response;
  },

  deleteAuthor: async (id: string) => {
  const data=  await axiosServices.delete(`${API_URL}/${id}`);
    return data;
  },
};
