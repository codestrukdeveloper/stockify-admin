import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { ISector } from '@/app/(DashboardLayout)/types/apps/sector';

const API_URL = 'http://13.232.10.252:3000/api/v1/admin/Sector/';

interface StateType {
  sectors: ISector[];
  Sector: ISector|null;
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
  sectors: [],
  Sector: null,
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

export const SectorSlice = createSlice({
  name: 'Sector',
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

    // GET Sector
    getSector: (state, action) => {
      state.sectors = action.payload.data;
      state.total = action.payload.totalPage;
      state.loading = false;


    },
    getSectorById: (state, action) => {
      state.Sector = action.payload.data;
      state.loading = false;
    },

    deleteSectorById: (state, action) => {
      state.sectors = action.payload.data;
      state.loading = false;
    },
    createSector: (state, action) => {
      state.Sector = action.payload.data;
      state.loading = false;
    },

    updateSector: (state, action) => {
      state.Sector = action.payload.data;
      state.loading = false;
    },

    SearchSector: (state, action) => {
      state.sectors = action.payload.data;
      state.total = action.payload.totalPage;
      state.loading = false;


    },

    //  SORT  Sector
    sortBySector(state, action) {
      state.sortBy = action.payload;
    },

    //  SORT  Sector

    //  SORT  By Color
    filterSector(state, action) {
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
  getSector,
  getSectorById,
  SearchSector,
  startLoading,
  stopLoading,
  sortBySector,
  createSector,
  filterSector,
  filterReset,
  updateSector,
  deleteSectorById
} = SectorSlice.actions;


export default SectorSlice.reducer;
