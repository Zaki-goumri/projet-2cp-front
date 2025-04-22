import axios from 'axios';
import { serialize } from 'cookie';
import { useUserStore } from '@/modules/shared/store/userStore';

export const baseUrl = import.meta.env.VITE_BASE_URL;

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000; 
const REFRESH_RETRY_ATTEMPTS = 2;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (request) => {
    const accessToken = document.cookie
      .split(';')
      .find((cookie: string) => cookie.includes('accessToken'))
      ?.split('=')[1];
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const clearAuthCookies = () => {
  document.cookie = serialize('accessToken', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  document.cookie = serialize('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  useUserStore.getState().logout();
};

const refreshAuthToken = async (refreshToken: string, retryCount = 0): Promise<{ access: string; refresh?: string }> => {
  try {
    const response = await instance.post('/Auth/Refresh', {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    if (retryCount < REFRESH_RETRY_ATTEMPTS) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return refreshAuthToken(refreshToken, retryCount + 1);
    }
    throw error;
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retryCount = originalRequest._retryCount || 0;
      
      if (originalRequest._retryCount >= MAX_RETRY_ATTEMPTS) {
        clearAuthCookies();
        return Promise.reject(new Error('Max retry attempts exceeded'));
      }
      
      originalRequest._retry = true;
      originalRequest._retryCount += 1;
      
      try {
        const refreshToken = document.cookie
          .split(';')
          .find((cookie: string) => cookie.includes('refreshToken'))
          ?.split('=')[1];

        if (!refreshToken) {
          clearAuthCookies();
          return Promise.reject(error);
        }

        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));

        const { access: newAccessToken, refresh: newRefreshToken } = await refreshAuthToken(refreshToken);

        if (!newAccessToken) {
          clearAuthCookies();
          return Promise.reject(error);
        }

        document.cookie = serialize('accessToken', newAccessToken, {
          httpOnly: false,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        });

        if (newRefreshToken) {
          document.cookie = serialize('refreshToken', newRefreshToken, {
            httpOnly: false,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
        }

        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        clearAuthCookies();
        return Promise.reject(`error in refreshing: ${refreshError}`);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
