import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import {  ICategory } from '@/app/(DashboardLayout)/types/apps/industry';

const API_URL = 'https://production.stockifyfintech.co.in/api/v1/admin/category/';

interface StateType {
  categories: ICategory[];
  category: ICategory|null;
  addCategory: ICategory|null;
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
  error: string;
}

const initialState:StateType = {
  categories: [],
  category: null,
  addCategory: null,

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
  error: '',
};

export const categorieslice = createSlice({
  name: 'category',
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
      state.error = action.payload;
      state.loading = false;

    },

    getCategories: (state, action) => {
      state.categories = action.payload.data;
      state.total = action.payload.totalPage;
      state.loading = false;


    },
    getCategoryById: (state, action) => {
      state.category = action.payload.data;
      state.loading = false;
    },

    createCategory: (state, action) => {
      state.categories = action.payload.data;
      state.loading = false;
    },
    // searchCategory: (state, action) => {
    //   state.category = action.payload.data;
    //   state.loading = false;
    // },

    deleteCategory: (state, action) => {
      state.category = action.payload.data;
      state.loading = false;
    },

    searchCategory: (state, action) => {
      state.categories = action.payload.data;
      state.total = action.payload.totalPage;
      state.loading = false;
    },

    //  SORT  category
    sortByICategory(state, action) {
      state.sortBy = action.payload;
    },

    //  SORT  category
    filterICategory(state, action) {
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
  getCategories,
  getCategoryById,
  searchCategory,
  startLoading,
  stopLoading,
  sortByICategory,
  filterICategory,
  filterReset,
} = categorieslice.actions;


export default categorieslice.reducer;
