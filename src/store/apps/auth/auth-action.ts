import { IUser } from "@/app/(DashboardLayout)/types/apps/users";
import { hasError, logoutSuccess, registerSuccess, stopLoading } from "@/store/apps/auth/AuthSlice";
import { loginSuccess } from "@/store/apps/auth/AuthSlice";
import { startLoading } from "@/store/apps/auth/AuthSlice";
import { AppDispatch } from "@/store/store";
import axios from "axios";
import { BASE_URL } from "../../../utils/api";
import axiosServices from "../../../utils/axios";

const API_URL = `${BASE_URL}/admin/auth`;

// Function to set tokens in localStorage
const setTokensInLocalStorage = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};



// Modify the login action
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axiosServices.post(`${API_URL}/login`, { email, password });

    // Get tokens from response and set them in localStorage
    console.log("Respomse",response);

    const { accessToken, refreshToken } = response.data;
    setTokensInLocalStorage(accessToken, refreshToken);

    // Dispatch login success with user data
    dispatch(loginSuccess(response.data));

    // Optionally set the refresh token in Authorization header for future requests
    axiosServices.defaults.headers['Authorization'] = `Bearer ${refreshToken}`;

  } catch (error: any) {
    console.log("ERROR", error);

    dispatch(hasError({
      message: error?.message || 'Invalid credentials. Please check your email and password.',
      errors: error?.errors || [],
    }));
  }
};

// Modified register action
export const register = (userData: IUser) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    dispatch(registerSuccess(response.data));
  } catch (error: any) {
    console.log("ERROR", error);

    dispatch(hasError({
      message: error?.message || 'Registration failed. Please ensure all fields are correctly filled.',
      errors: error?.errors || [],
    }));
  }
};

// Modified logout action
export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    await axiosServices.post(`${API_URL}/logout`);

    // Clear tokens from localStorage on logout
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch(logoutSuccess());
  } catch (error: any) {
    console.log("ERROR", error);
    dispatch(hasError({
      message: error?.message || 'Logout failed. Please try again later.',
      errors: error?.errors || [],
    }));
  }
};

// Modified loginDetails action
export const loginDetails = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const response = await axiosServices.get(`${API_URL}/me`);
    dispatch(loginSuccess(response.data));
  } catch (error: any) {
    console.log("Error", error);
    dispatch(hasError(error));
  }
};
