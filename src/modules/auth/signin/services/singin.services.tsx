import axios from 'axios';
import { serialize } from 'cookie';
import { LoginRequest, LoginResponse } from '../types/signin.types';
import { baseUrl } from '@/api/axios.config';
  import { Student, Company } from '@/modules/shared/types/shared.types';
export const loginUser = async (data: LoginRequest): Promise<Student | Company> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${baseUrl}/Auth/Login`,
      data
    );
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
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};
