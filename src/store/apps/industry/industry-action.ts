import { deleteIndustryById, getIndustry, getIndustryById, hasError, startLoading, updateIndustry } from "@/store/apps/industry/IndustrySlice";
import { AppDispatch } from "@/store/store";
import { IIndustry } from "@/app/(DashboardLayout)/types/apps/industry";
import { useUpdateIndustry } from "@/hooks/useIndustry";
import { BASE_URL } from "@/utils/api";
import axiosServices from "@/utils/axios";


// Thunk actions for API calls

const API_URL=BASE_URL+"/admin/industry"

export const fetchIndustries = (page: number, limit: number) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
    console.log("resposse",response);
    const data={
      ...response.data.data,
      total:limit*response.data.data.totalPage
    }
    dispatch(getIndustry(data));
  } catch (error: any) {
    console.log("ErrorFetching",error);
    dispatch(hasError(error));
  }
};

export const fetchIndustry = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.get(`${API_URL}/${id}`);
    dispatch(getIndustryById(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error));
  }
};

export const createIndustry = (industry: IIndustry) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.post(API_URL, industry);
    dispatch(createIndustry(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error));
  }
};

export const updateIndustryAction = (id: string, industry: Partial<IIndustry>) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.put(`${API_URL}/${id}`, industry);
    dispatch(updateIndustry(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error));
  }
};

export const deleteIndustryAction = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    await axiosServices.delete(`${API_URL}/${id}`);
    dispatch(deleteIndustryById(id));
  } catch (error: any) {
    dispatch(hasError(error));
  }
};
