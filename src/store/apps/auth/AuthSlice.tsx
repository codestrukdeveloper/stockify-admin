import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { IUser } from '@/app/(DashboardLayout)/types/apps/users';

const API_URL = 'http://localhost:3001/api/v1/admin/auth';

interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: {
    message: string;
    errors:string[]
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    hasError(state, action) {
      state.error = {
        message: action.payload?.message || 'An unexpected error occurred. Please try again.',
        errors: action.payload?.errors || {},
      };
      state.loading = false;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  hasError,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} = AuthSlice.actions;

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    dispatch(loginSuccess(response.data));
  } catch (error: any) {
    console.log("ERROR",error)

    dispatch(hasError({
      message: error?.message || 'Invalid credentials. Please check your email and password.',
      errors: error?.errors || [],
    }));
  }
};

export const register = (userData: IUser) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    dispatch(registerSuccess(response.data));
  } catch (error: any) {
    console.log("ERROR",error)

    dispatch(hasError({
      message: error?.message || 'Registration failed. Please ensure all fields are correctly filled.',
      errors: error?.errors || [],
    }));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    await axios.post(`${API_URL}/logout`);
    dispatch(logoutSuccess());
  } catch (error: any) {
    console.log("ERROR",error)
    dispatch(hasError({
      message: error?.message || 'Logout failed. Please try again later.',
      errors: error?.errors || [],
    }));
  }
};

export default AuthSlice.reducer;
