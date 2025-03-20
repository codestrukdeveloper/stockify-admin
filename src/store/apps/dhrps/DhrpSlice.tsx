import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { IDhrps } from '@/app/(DashboardLayout)/types/apps/industry';

const API_URL = 'https://production.stockifyfintech.co.in/api/v1/admin/Dhrps/';

interface StateType {
  dhrps: IDhrps[];
  Dhrps: IDhrps|null;
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
  dhrps: [],
  Dhrps: null,
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

export const DhrpsSlice = createSlice({
  name: 'Dhrps',
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

    // GET Dhrps
    getDhrps: (state, action) => {
      state.dhrps = action.payload.data;
      state.total = action.payload.totalPage;
      state.loading = false;


    },
    getDhrpsById: (state, action) => {
      state.Dhrps = action.payload.data;
      state.loading = false;
    },

    deleteDhrpsById: (state, action) => {
      state.dhrps = action.payload.data;
      state.loading = false;
    },
    createDhrps: (state, action) => {
      state.Dhrps = action.payload.data;
      state.loading = false;
    },

    updateDhrps: (state, action) => {
      state.Dhrps = action.payload.data;
      state.loading = false;
    },

    SearchDhrps: (state, action) => {
      state.dhrps = action.payload.data;
      state.total = action.payload.totalPage;
      state.loading = false;


    },

    //  SORT  Dhrps
    sortByDhrps(state, action) {
      state.sortBy = action.payload;
    },

    //  SORT  Dhrps

    //  SORT  By Color
    filterDhrps(state, action) {
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
  getDhrps,
  getDhrpsById,
  SearchDhrps,
  startLoading,
  stopLoading,
  sortByDhrps,
  createDhrps,
  filterDhrps,
  filterReset,
  updateDhrps,
  deleteDhrpsById
} = DhrpsSlice.actions;


export default DhrpsSlice.reducer;
