import axios, { AxiosError } from 'axios';
import { config } from '../config/env';
import { CollectionApiResponse, CollectionPayload } from '../types/collection';

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 15000,
});

export const createCollection = async (payload: CollectionPayload): Promise<CollectionApiResponse> => {
  try {
    const response = await api.post<CollectionApiResponse>('/api/collections', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const serverMessage = axiosError.response?.data?.message;
      throw {
        status: axiosError.response?.status ?? 0,
        message: serverMessage || axiosError.message,
      };
    }

    throw {
      status: 0,
      message: 'Network connection error. Please try again.',
    };
  }
};

export const getCollections = async (): Promise<CollectionApiResponse[]> => {
  try {
    const response = await api.get<{ message: string; data: CollectionApiResponse[] }>('/api/collections');
    return response.data.data ?? [];
  } catch (error) {
    throw new Error('Unable to fetch collections');
  }
};
