import axios from '@/api/axios.config';
import { serialize } from 'cookie';
import { LoginRequest, User, LoginResponse } from '../types/signin.types';

export const loginUser = async (data: LoginRequest): Promise<User> => {
  try {
    const response = await axios.post<LoginResponse>('/Auth/signin', data);
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
