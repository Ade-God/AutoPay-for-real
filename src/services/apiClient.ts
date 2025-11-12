import axios from 'axios';
import Constants from 'expo-constants';
import { logger } from '@/utils/logger';

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiBaseUrl || process.env.API_BASE_URL || 'https://mock.api'
});

// TODO: integrate with Go backend - attach auth headers and Go services here

api.interceptors.request.use((config) => {
  logger.info('Request', config.url);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    logger.error('API error', error);
    return Promise.reject(error);
  }
);

export const apiClient = api;

export type ApiClient = typeof apiClient;
