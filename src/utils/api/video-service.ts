import { IVideo } from "@/app/(DashboardLayout)/types/apps/IVideo";
import { BASE_URL } from ".";
import axiosServices from "../axios";

const API_URL = BASE_URL+'/admin/video';

export const videoService = {
  fetchVideos: async (page: number, limit: number) => {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response;
  },

  searchVideos: async (page: number, limit: number, search: string) => {
    const response = await axiosServices.get(
      `${API_URL}?page=${page}&limit=${limit}&search=${search}&searchName=${search}`
    );
    return response;
  },

  fetchVideoById: async (id: string) => {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    return response;
  },
  fetchVideoBySlug: async (slug: string) => {
    const response = await axiosServices.get(`${API_URL}/${slug}`);
    return response;
  },
  deleteVideoById: async (id: string) => {
    const response = await axiosServices.delete(`${API_URL}/${id}`);
    return response.data.data;
  },

  createVideo: async (video: IVideo) => {
    const response = await axiosServices.post(API_URL, video);
    return response.data.data;
  },
  updateVideo: async (id:string, video: Partial<IVideo>) => {
    const response = await axiosServices.put(`${API_URL}/${id}`, video);
    return response.data.data;
  },
};
