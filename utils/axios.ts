import axios from "axios";
import { getSession } from "next-auth/react";
import useSWR from 'swr';

interface FetchDataOptions {
  headers?: Record<string, string>;
}


const baseURL = "https://petrodata.zainnovations.com/api/v1/";
const instance = axios.create({
  baseURL,
});

export default instance;

export const authAxiosInstance = axios.create({
  baseURL,
  // timeout: 4500,
});

export const PlainTransportDekApi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

authAxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getSession();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetcher = async (url: string) => {
  try {
    const response = await PlainTransportDekApi.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchData = (endpoint: string) => {
  const { data, error } = useSWR(endpoint, fetcher, { refreshInterval: 1000 });
  return { data, error };
};

export const MultiTransportDekApi = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data;',
  },
});

export const fetchDatax = async (url: string, options?: FetchDataOptions) => {
  try {
    const response = await fetch(url, {
      headers: options?.headers || {},
    });

    if (!response.ok) {
      console.error(`Failed to fetch data from ${url}. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    
  }
};