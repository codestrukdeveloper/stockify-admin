import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { ICompany, ICompanyFull } from '@/app/(DashboardLayout)/types/apps/ICompany';

const API_URL = 'http://13.232.10.252:3000/api/v1/admin/company/';

interface StateType {
    companies: ICompany[];
    company: ICompanyFull | null;
    AddCompany: ICompanyFull | null;
    CompanySearch: string;
    sortBy: string;
    cart: any[];
    total: number;
    totalPage: number;
    limit: number;

    filters: {
        category: string;
        color: string;
        gender: string;
        price: string;
        rating: string;
    };
    error: string;
}

const initialState: StateType = {
    companies: [],
    company: null,
    AddCompany: null,

    CompanySearch: '',
    sortBy: 'newest',
    cart: [],
    total: 0,
    limit: 0,
    totalPage: 0,
    filters: {
        category: 'All',
        color: 'All',
        gender: 'All',
        price: 'All',
        rating: '',
    },
    error: '',
};

export const CompanySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        // HAS ERROR

        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CompanyS
        getCompanies: (state, action) => {
            state.companies = action.payload.data;
            state.total = action.payload.totalPage;

        },

        getCompanyById: (state, action) => {
            state.company = action.payload.data;
        },

        createCompany: (state, action) => {
            state.AddCompany = action.payload.data;
        },

        SearchCompany: (state, action) => {
            state.CompanySearch = action.payload;
        },

        //  SORT  CompanyS
        sortByCompanys(state, action) {
            state.sortBy = action.payload;
        },


        sortByPrice(state, action) {
            state.filters.price = action.payload.price;
        },

        //  FILTER CompanyS
        filterCompanys(state, action) {
            state.filters.category = action.payload.category;
        },

        //  FILTER Reset
        filterReset(state) {
            state.filters.category = 'All';
            state.filters.price = 'All';
            state.sortBy = 'newest';
        },


    },
});
export const {
    hasError,
    getCompanies,
    getCompanyById,
    createCompany,
    SearchCompany,
    sortByCompanys,
    filterCompanys,
    sortByPrice,
    filterReset,
} = CompanySlice.actions;



export default CompanySlice.reducer;
