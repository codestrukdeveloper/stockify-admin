import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { ICompanyFull } from '@/app/(DashboardLayout)/types/apps/company';

const API_URL = 'http://localhost:3001/api/v1/admin/company/';

interface StateType {
  products: ICompanyFull[];
  productSearch: string;
  sortBy: string;
  cart: any[];
  total: number;
  totalPage: number;
  limit: number;
  filters: {
    category: string;
    price: string;
    rating: string;
  };
  error: string;
}

const initialState = {
  products: [],
  productSearch: '',
  sortBy: 'newest',
  cart: [],
  total: 0,
  totalPage: 0,
  limit:50,
  filters: {
    category: 'All',
    price: 'All',
    rating: '',
  },
  error: '',
};

export const EcommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    // HAS ERROR

    hasError(state: StateType, action) {
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProducts: (state, action) => {
      state.products = action.payload.data;
      state.total = action.payload.totalPage;

    },
    SearchProduct: (state, action) => {
      state.productSearch = action.payload;
    },

    //  SORT  PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    //  SORT  PRODUCTS

    //  SORT  By Color

    //  SORT  By Color
    sortByPrice(state, action) {
      state.filters.price = action.payload.price;
    },

    //  FILTER PRODUCTS
    filterProducts(state, action) {
      state.filters.category = action.payload.category;
    },

    //  FILTER Reset
    filterReset(state) {
      state.filters.category = 'All';
      state.filters.price = 'All';
      state.sortBy = 'newest';
    },

    // ADD TO CART
    addToCart(state: StateType, action) {
      const product = action.payload;
      state.cart = [...state.cart, product];
    },

    // qty increment
    increment(state: StateType, action) {
      const productId = action.payload;
      const updateCart = map(state.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            qty: product.qty + 1,
          };
        }

        return product;
      });

      state.cart = updateCart;
    },

    // qty decrement
    decrement(state: StateType, action) {
      const productId = action.payload;
      const updateCart = map(state.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            qty: product.qty - 1,
          };
        }

        return product;
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
  getProducts,
  SearchProduct,
  sortByProducts,
  filterProducts,
  increment,
  deleteCart,
  decrement,
  addToCart,
  sortByPrice,
  filterReset,
} = EcommerceSlice.actions;

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log("RESPONSE",response.data.data);
    dispatch(getProducts(response.data.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};


export const fetchCompanyById = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log("RESPONSE",response.data.data);
    dispatch(getProducts(response.data.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const createCompany = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log("RESPONSE",response.data.data);
    dispatch(getProducts(response.data.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export default EcommerceSlice.reducer;
