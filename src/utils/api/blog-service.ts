import { IBlog } from "@/app/(DashboardLayout)/types/apps/IBlog";
import { BASE_URL } from ".";
import axiosServices from "../axios";

const API_URL = BASE_URL+'/admin/blog';

export const blogService = {
  fetchBlogs: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  uploadImage: async (folder: string, files: File[]) => {
    const formData = new FormData();
  
    files.forEach(file => {
      formData.append("files", file);
    });
  
    formData.append("folder", folder);
  
    const response = await axiosServices.post(`${BASE_URL}/admin/upload`, formData);
    return response.data;
  },
  

  searchBlogs: async (page: number, limit: number, search: string) => {
    const response = await axiosServices.get(
      `${API_URL}?page=${page}&limit=${limit}&search=${search}&searchName=${search}`
    );
    return response;
  },

  fetchBlogById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response.data.data;
  },
  deleteBlogById: async (id: string) => {
    const response = await axiosServices.delete(`${API_URL}/${id}`);
    return response.data.data;
  },

  createBlog: async (blog: IBlog) => {
    const response = await axiosServices.post(API_URL, blog);
    return response.data.data;
  },
  updateBlog: async (id:string, blog: Partial<IBlog>) => {
    const response = await axiosServices.post(`${API_URL}+/${id}`, blog);
    return response.data.data;
  },
};
