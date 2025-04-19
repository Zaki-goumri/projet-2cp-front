import axios from '@/api/axios.config';
import { serialize } from 'cookie';
import { LoginRequest, User, LoginResponse } from '../types/signin.types';

export const loginUser = async (data: LoginRequest): Promise<User> => {
  try {
    const response = await axios.post<LoginResponse>('/Auth/Login', data);
    document.cookie = serialize('accessToken', response.data.access, {
      httpOnly: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    document.cookie = serialize('refreshToken', response.data.refresh, {
      httpOnly: false,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return response.data.user;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    document.cookie = serialize('accessToken', '', {
      httpOnly: false,
      expires: new Date(0),
      path: '/',
    });
    document.cookie = serialize('refreshToken', '', {
      httpOnly: false,
      expires: new Date(0),
      path: '/',
    });
    
    // Optional: Call logout endpoint if your API requires it
    // await axios.post('/Auth/Logout');
    
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};
