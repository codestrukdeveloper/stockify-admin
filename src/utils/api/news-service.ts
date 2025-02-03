import { INews } from "@/app/(DashboardLayout)/types/apps/INews";
import { BASE_URL } from ".";
import axiosServices from "../axios";

const API_URL = BASE_URL+'/admin/news';

export const newsService = {
  fetchNewss: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response;
  },

  searchNewss: async (page: number, limit: number, search: string) => {
    const response = await axiosServices.get(
      `${API_URL}?page=${page}&limit=${limit}&search=${search}&searchName=${search}`
    );
    return response;
  },

  fetchNewsById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },
  fetchNewsBySlug: async (slug: string) => {
    const response = await axiosServices.get(`${API_URL}/${slug}`);
    return response;
  },
  deleteNewsById: async (id: string) => {
    const response = await axiosServices.delete(`${API_URL}/${id}`);
    return response.data.data;
  },

  createNews: async (news: INews) => {
    const response = await axiosServices.post(API_URL, news);
    return response.data.data;
  },
  updateNews: async (id:string, news: Partial<INews>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, news);
    return response.data.data;
  },
};
