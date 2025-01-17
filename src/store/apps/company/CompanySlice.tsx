import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';

const API_URL = 'http://localhost:3001/api/v1/admin/company/';

interface StateType {
    Companys: any[];
    CompanySearch: string;
    sortBy: string;
    cart: any[];
    total: number;
    totalPage: number;
    filters: {
        category: string;
        color: string;
        gender: string;
        price: string;
        rating: string;
    };
    error: string;
}

const initialState = {
    Companys: [],
    CompanySearch: '',
    sortBy: 'newest',
    cart: [],
    total: 0,
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

        hasError(state: StateType, action) {
            state.error = action.payload;
        },

        // GET CompanyS
        getCompanys: (state, action) => {
            state.Companys = action.payload.data;
            state.total = action.payload.totalPage;

        },
        SearchCompany: (state, action) => {
            state.CompanySearch = action.payload;
        },

        //  SORT  CompanyS
        sortByCompanys(state, action) {
            state.sortBy = action.payload;
        },

     

       

        //  SORT  By Color
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

        increment(state: StateType, action) {
            const CompanyId = action.payload;
            const updateCart = map(state.cart, (Company) => {
                if (Company.id === CompanyId) {
                    return {
                        ...Company,
                        qty: Company.qty + 1,
                    };
                }

                return Company;
            });

            state.cart = updateCart;
        },

        // qty decrement
        decrement(state: StateType, action) {
            const CompanyId = action.payload;
            const updateCart = map(state.cart, (Company) => {
                if (Company.id === CompanyId) {
                    return {
                        ...Company,
                        qty: Company.qty - 1,
                    };
                }

                return Company;
            });

            state.cart = updateCart;
        },

        // delete Cart
        deleteCart(state: StateType, action) {
            const updateCart = filter(state.cart, (item) => item.id !== action.payload);
            state.cart = updateCart;
        },
    },
});
export const {
    hasError,
    getCompanys,
    SearchCompany,
    sortByCompanys,
    filterCompanys,
    increment,
    deleteCart,
    decrement,
    sortByPrice,
    filterReset,
} = CompanySlice.actions;

export const fetchCompanys = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}`);
        console.log("RESPONSE", response.data.data);
        dispatch(getCompanys(response.data.data));
    } catch (error) {
        dispatch(hasError(error));
    }
};

export default CompanySlice.reducer;
