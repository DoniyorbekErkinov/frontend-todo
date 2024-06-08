// src/api.ts
import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const ApiService = {
  get(url: string) {
    return apiClient.get(url);
  },
  post(url: string, data: any) {
    return apiClient.post(url, data);
  },
  put(url: string, data: any) {
    return apiClient.put(url, data);
  },
  delete(url: string) {
    return apiClient.delete(url);
  },
};
