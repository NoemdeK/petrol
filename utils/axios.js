import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseURL = 'https://petrodata.zainnovations.com/api/v1';
const instance = axios.create({
  baseURL,
});

export default instance;

export const authAxiosInstance = axios.create({
  baseURL,
  // timeout: 4500,
});

authAxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getSession();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect the user to the login page here.
      window.location.href = '/auth/login'; // Adjust the URL as needed.
    }
    return Promise.reject(error);
  }
);

export const multerAxiosInstance = axios.create({
  baseURL,
});

multerAxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getSession();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Set the Content-Type header to application/json
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
