import { AppDispatch } from "@/store/store";
import { deleteSectorById, getSectorById, updateSector } from "@/store/apps/sector/SectorSlice";
import { getSector, hasError } from "@/store/apps/sector/SectorSlice";
import { startLoading } from "@/store/apps/sector/SectorSlice";
import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import { BASE_URL } from "@/utils/api";
import axiosServices from "@/utils/axios";



const API_URL=BASE_URL+"/admin/sector"

export const fetchSectors = (page: number, limit: number) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    dispatch(getSector({ Sector: response.data.data, total: response.data.total }));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const fetchSector = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    dispatch(getSectorById(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const createSector = (Sector: ISector) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.post(API_URL, Sector);
    dispatch(createSector(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const updateSectorAction = (id: string, Sector: Partial<ISector>) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.put(`${API_URL}/${id}`, Sector);
    dispatch(updateSector(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const deleteSectorAction = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    await axiosServices.delete(`${API_URL}/${id}`);
    dispatch(deleteSectorById(id));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};
