import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { IndustryList } from '@/app/(DashboardLayout)/types/apps/industry';

const API_URL = 'http://localhost:3001/api/v1/admin/Industry/';

interface StateType {
  industries: IndustryList[];
  industry: IndustryList|null;
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
  error: '',
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
      state.error = action.payload;
      state.loading = false;

    },

    // GET Industry
    getIndustry: (state, action) => {
      state.industries = action.payload.data;
      state.total = action.payload.totalPage;
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
} = IndustrySlice.actions;


export const fetchIndustry = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const response = await axios.get(`${API_URL}`);
    console.log("fetchIndustry",response.data.data);
    dispatch(getIndustry(response.data.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};


export const fetchIndustryById = (id:string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const response = await axios.get(`${API_URL}`);
    console.log("fetchIndustryById",response.data.data);
    dispatch(getIndustryById(response.data.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const AddIndustry = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const response = await axios.post(`${API_URL}`);
    console.log("RESPONSE",response.data.data);
    dispatch(createIndustry(response.data.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};


export const deleteIndustry = (id:string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const response = await axios.post(`${API_URL}`);
    console.log("RESPONSE",response.data.data);
    dispatch(createIndustry(response.data.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export default IndustrySlice.reducer;
