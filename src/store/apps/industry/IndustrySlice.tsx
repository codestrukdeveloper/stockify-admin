import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { IIndustry } from '@/app/(DashboardLayout)/types/apps/industry';
import { IError } from '@/app/(DashboardLayout)/types/apps/error';

const API_URL = 'http://13.232.10.252:3000/api/v1/admin/Industry/';

interface StateType {
  industries: IIndustry[];
  industry: IIndustry|null;
  search: string;
  loading:boolean,
  sortBy: string;
  total: number;
  totalPage: number;
  limit: number;
  filters: {
    category: string;
    rating: string;
  };
  error: IError;
}

const initialState:StateType = {
  industries: [],
  industry: null,
  search: 'newest',
  loading:false,
  sortBy: 'newest',
  total: 0,
  totalPage: 0,
  limit:50,
  filters: {
    category: 'All',
    rating: '',
  },
  error: {
    errors:[],
    message:''
  },
};

export const IndustrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {
    // HAS ERROR
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    hasError(state: StateType, action) {
      console.log("Action",action.payload);
      state.error = {
        message: action.payload?.message || 'An unexpected error occurred. Please try again.',
        errors: action.payload?.errors || {},
      };
      state.loading = false;

    },

    // GET Industry
    getIndustry: (state, action) => {

      state.industries = action.payload.data;
      state.total = action.payload.total;
      state.totalPage = action.payload.totalPage;

      state.loading = false;


    },
    getIndustryById: (state, action) => {
      state.industry = action.payload.data;
      state.loading = false;
    },

    deleteIndustryById: (state, action) => {
      state.industries = action.payload.data;
      state.loading = false;
    },
    createIndustry: (state, action) => {
      state.industry = action.payload.data;
      state.loading = false;
    },

    updateIndustry: (state, action) => {
      state.industry = action.payload.data;
      state.loading = false;
    },

    SearchIndustry: (state, action) => {
      state.industries = action.payload.data;
      state.total = action.payload.totalPage;
      state.loading = false;


    },

    //  SORT  Industry
    sortByIndustry(state, action) {
      state.sortBy = action.payload;
    },

    //  SORT  Industry

    //  SORT  By Color
    filterIndustry(state, action) {
      state.filters.category = action.payload.category;
    },

    //  FILTER Reset
    filterReset(state) {
      state.filters.category = 'All';
      state.sortBy = 'newest';
    },

  },
});
export const {
  hasError,
  getIndustry,
  getIndustryById,
  SearchIndustry,
  startLoading,
  stopLoading,
  sortByIndustry,
  createIndustry,
  filterIndustry,
  filterReset,
  updateIndustry,
  deleteIndustryById
} = IndustrySlice.actions;


export default IndustrySlice.reducer;
