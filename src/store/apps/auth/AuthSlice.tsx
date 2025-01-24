import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { IUser } from '@/app/(DashboardLayout)/types/apps/users';


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
      console.log("actions",action)
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



export default AuthSlice.reducer;
