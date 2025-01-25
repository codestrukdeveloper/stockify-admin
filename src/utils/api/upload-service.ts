import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import axiosServices from "../axios";
import { BASE_URL } from ".";

const API_URL = BASE_URL + '/admin/upload';

export const uploadService = {
    upload: async (files: File[], folder: string) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file); // Append multiple files
        });
        formData.append('folder', folder);

        const response = await axiosServices.post(`${API_URL}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response;
    },
    deleteImage: async (key: string) => {
        const data = await axiosServices.delete(`${API_URL}/?key=${key}`);
        return data;
    },
};
