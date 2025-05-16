import axios from '@/api/axios.config';
import { serialize } from 'cookie';
import { RegisterRequest, RegisterResponse } from '../types/signup.types';
import { Student, Company } from '@/modules/shared/types/shared.types';

class SignupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SignupError';
  }
}

export class SignupService {
  private static instance: SignupService | null = null;
  private readonly endpoint = '/Auth/Signup';

  private constructor() {}

  public static getInstance(): SignupService {
    if (!SignupService.instance) {
      SignupService.instance = new SignupService();
    }
    return SignupService.instance;
  }

  private setAuthCookies(accessToken: string, refreshToken: string): void {
    document.cookie = serialize('accessToken', accessToken, {
      httpOnly: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
    });
    document.cookie = serialize('refreshToken', refreshToken, {
      httpOnly: false,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: '/',
    });
  }

  public async register(data: RegisterRequest): Promise<Student | Company> {
    try {
      const response = await axios.post<RegisterResponse>(this.endpoint, data);
      this.setAuthCookies(response.data.access, response.data.refresh);
      return response.data.user;
    } catch (error) {
      console.error('Registration Error:', error);
      throw new SignupError('Failed to register');
    }
  }
}

export const signupService = SignupService.getInstance(); 