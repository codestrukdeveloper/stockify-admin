import { createCompany, getCompanyById, hasError } from "@/store/apps/company/CompanySlice";

import { getCompanies } from "@/store/apps/company/CompanySlice";

import axios from "../axios";

import { AppDispatch } from "@/store/store";
import axiosServices from "../axios";
import { BASE_URL } from ".";

const API_URL=`${BASE_URL}/admin/company`
export const fetchCompanys = (page:number,limit:number) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}`);
        console.log("RESPONSE", response.data.data);
        dispatch(getCompanies(response.data.data));
        
    } catch (error: any) {
        console.log("ERROR", error?.response)

        dispatch(hasError(error));
    }
};

export const searchCompanies = (page:number,limit:number,search:string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosServices.get(`${API_URL}?page=${page}&limit=${limit}&&search=${search}&&searchName=${search}`);
        console.log("RESPONSE", response.data.data);
        dispatch(getCompanies(response.data.data));
        
    } catch (error: any) {
        console.log("ERROR", error?.response)

        dispatch(hasError(error));
    }
};



export const fetchCompanyById = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}`);
        console.log("RESPONSE", response.data.data);
        dispatch(getCompanyById(response.data.data));
    } catch (error: any) {
        console.log("ERROR", error?.response)

        dispatch(hasError(error));
    }
};

export const AddCompany = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}`);
        console.log("RESPONSE", response.data.data);
        dispatch(createCompany(response.data.data));
    } catch (error: any) {
        console.log("ERROR", error?.response)
        dispatch(hasError(error));
    }
};
