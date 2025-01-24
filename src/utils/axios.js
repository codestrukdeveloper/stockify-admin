import axios from 'axios';


const getRefreshTokenFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("refreshToken");
  }
  return null; 
};


const BASE_URL = 'http://localhost:3001/api/v1';

const axiosServices = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosServices.interceptors.request.use(
  async (config) => {

    // const cookieStore = cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = getRefreshTokenFromLocalStorage();

    config.headers.Authorization = `Bearer ${refreshToken}`

    // Log or debug tokens if needed
    // console.log("Access Token:", accessToken);
    // console.log("Refresh Token:", refreshToken);

    return config;
  },
  (error) => Promise.reject(error)
);



axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error))
);

export default axiosServices;
