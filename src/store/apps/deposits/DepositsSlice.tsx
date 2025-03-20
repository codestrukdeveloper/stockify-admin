import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { IDeposit } from '@/app/(DashboardLayout)/types/apps/deposit';

const API_URL = 'http://13.232.10.252:3000/api/v1/admin/deposit/';

interface StateType {
  deposits: IDeposit[];
  deposit: IDeposit | null;
  search: string;
  loading: boolean;
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

const initialState: StateType = {
  deposits: [],
  deposit: null,
  search: 'newest',
  loading: false,
  sortBy: 'newest',
  total: 0,
  totalPage: 0,
  limit: 50,
  filters: {
    category: 'All',
    rating: '',
  },
  error: '',
};

export const depositSlice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    // Loading States
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // Deposit Actions
    getDeposits(state, action) {
      state.deposits = action.payload.data;
      state.total = action.payload.totalPage;
      state.loading = false;
    },
    getDepositById(state, action) {
      state.deposit = action.payload.data;
      state.loading = false;
    },
    deleteDepositById(state, action) {
      state.deposits = action.payload.data;
      state.loading = false;
    },
    createDeposit(state, action) {
      state.deposit = action.payload.data;
      state.loading = false;
    },
    updateDeposit(state, action) {
      state.deposit = action.payload.data;
      state.loading = false;
    },
    archiveDeposits(state, action) {
      state.deposits = action.payload.data;
      state.total = action.payload.totalPage;
      state.loading = false;
    },

    // Sorting and Filtering
    sortByDeposit(state, action) {
      state.sortBy = action.payload;
    },
    filterDeposits(state, action) {
      state.filters.category = action.payload.category;
    },
    resetFilters(state) {
      state.filters.category = 'All';
      state.sortBy = 'newest';
    },
  },
});

export const {
  hasError,
  getDeposits,
  getDepositById,
  archiveDeposits,
  startLoading,
  stopLoading,
  sortByDeposit,
  createDeposit,
  filterDeposits,
  resetFilters,
  updateDeposit,
  deleteDepositById,
} = depositSlice.actions;

export default depositSlice.reducer;
