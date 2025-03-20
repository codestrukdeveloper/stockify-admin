import { AppDispatch } from "@/store/store";
import axios from "../../../utils/axios";
import { BASE_URL } from "../../../utils/api";
import { deleteDepositById, getDepositById, getDeposits, hasError, startLoading, updateDeposit } from "@/store/apps/deposits/DepositsSlice";
import { IDeposit } from "@/app/(DashboardLayout)/types/apps/deposit";


const API_URL=BASE_URL+"/admin/deposits"

export const fetchDeposits = (page: number, limit: number) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    dispatch(getDeposits({ Deposits: response.data.data, total: response.data.total }));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const fetchDepositsById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    dispatch(getDepositById(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const createDeposits = (Deposits: IDeposit) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(API_URL, Deposits);
    dispatch(createDeposits(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const updateDepositsAction = (id: string, Deposits: Partial<IDeposit>) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.put(`${API_URL}/${id}`, Deposits);
    dispatch(updateDeposit(response.data.data));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};

export const deleteDepositsAction = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch(deleteDepositById(id));
  } catch (error: any) {
    dispatch(hasError(error.response?.data || {}));
  }
};
