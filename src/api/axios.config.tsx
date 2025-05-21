import axios from 'axios';
import { serialize } from 'cookie';
import { useUserStore } from '@/modules/shared/store/userStore';

export const baseUrl = import.meta.env.VITE_BASE_URL;

/**
 * Clears both access and refresh tokens from cookies
 * This should be called during logout or when tokens are invalid
 */
export const clearAuthTokens = (): void => {
  const cookieOptions = {
    httpOnly: false,
    path: '/',
    expires: new Date(0) 
  };  

  document.cookie = serialize('accessToken', '', cookieOptions);
  document.cookie = serialize('refreshToken', '', cookieOptions);
  
  delete instance.defaults.headers.common['Authorization'];
};

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  },
});

instance.interceptors.request.use(
  (request) => {
    console.log('Request:', request.url);
    const accessToken = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('accessToken='))
      ?.split('=')[1];
      
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = document.cookie
          .split('; ')
          .find((cookie) => cookie.startsWith('refreshToken='))
          ?.split('=')[1];

        if (!refreshToken) {
          clearAuthTokens();
          useUserStore.getState().logout();
          return Promise.reject(error);
        }

        const response = await instance.post('/Auth/refresh', { refresh: refreshToken });
        const { access: newAccessToken, refresh: newRefreshToken } = response.data;

        if (!newAccessToken) {
          clearAuthTokens();
          useUserStore.getState().logout();
          return Promise.reject(error);
        }

        document.cookie = serialize('accessToken', newAccessToken, {
          httpOnly: false,
          path: '/',
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        if (newRefreshToken) {
          document.cookie = serialize('refreshToken', newRefreshToken, {
            httpOnly: false,
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
        }
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        return instance(originalRequest);
      } catch (refreshError) {
        clearAuthTokens();
        useUserStore.getState().logout();
        return Promise.reject(new Error(`Refresh token failed: ${refreshError}`));
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;
