import axios from 'axios';
import { serialize } from 'cookie';
import { RegisterRequest, RegisterResponse } from '../types/signup.types';
import { baseUrl } from '@/api/axios.config';
import { Student, Company } from '@/modules/shared/types/shared.types';

export const registerUser = async (data: RegisterRequest): Promise<Student | Company> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${baseUrl}/Auth/Signup`,
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
    console.error('Registration Error:', error);
    throw error;
  }
};
