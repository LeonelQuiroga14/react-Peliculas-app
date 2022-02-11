import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getToken } from '../auth/jwtManager';
export const configureAxiosMiddleware = () => {

    axios.interceptors.request.use(
        (config) => {

            const token = getToken();
            if (token) {
                config.headers.Authorization = `bearer ${token}`;

            }
            return config;
        }, (error)=> Promise.reject(error)
    )
}