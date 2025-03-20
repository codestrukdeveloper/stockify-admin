import axios from 'axios';


const getRefreshTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("refreshToken");
  }
  return null; 
};


// const BASE_URL = 'https://server.prod.stockifyfintechpvtltd.com/api/v1';

const BASE_URL = 'http://13.232.10.252:3001/api/v1';
// const BASE_URL = 'http://localhost:3001/api/v1';


const axiosServices = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosServices.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);



axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error))
);

export default axiosServices;
