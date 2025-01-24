import { AppDispatch } from "@/store/store";

import { deleteDhrpsById, getDhrpsById, hasError, startLoading, updateDhrps } from "@/store/apps/dhrps/DhrpSlice";
import { IDhrp } from "@/app/(DashboardLayout)/types/apps/IDhrp";
import axiosServices from "@/utils/axios";
import { BASE_URL } from "@/utils/api";


const API_URL=BASE_URL+"/admin/dhrp"

export const fetchDhrps = (page: number, limit: number) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    dispatch(getDhrpsById({ Dhrp: response.data.data, total: response.data.total }));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const fetchDhrpsById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    dispatch(getDhrpsById(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const createDhrp = (Dhrp: IDhrp) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.post(API_URL, Dhrp);
    dispatch(createDhrp(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const updateDhrpAction = (id: string, Dhrp: Partial<IDhrp>) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.put(`${API_URL}/${id}`, Dhrp);
    dispatch(updateDhrps(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const deleteDhrpAction = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    await axiosServices.delete(`${API_URL}/${id}`);
    dispatch(deleteDhrpsById(id));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};
