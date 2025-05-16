import axios from '@/api/axios.config';
import { serialize } from 'cookie';
import { LoginRequest, LoginResponse } from '../types/signin.types';
import { Student, Company } from '@/modules/shared/types/shared.types';

class SigninError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SigninError';
  }
}

export class SigninService {
  private static instance: SigninService | null = null;
  private readonly endpoint = '/Auth/Login';

  private constructor() {}

  public static getInstance(): SigninService {
    if (!SigninService.instance) {
      SigninService.instance = new SigninService();
    }
    return SigninService.instance;
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

  public async login(data: LoginRequest): Promise<Student | Company> {
    try {
      const response = await axios.post<LoginResponse>(this.endpoint, data);
      this.setAuthCookies(response.data.access, response.data.refresh);
      return response.data.user;
    } catch (error) {
      console.error('Login Error:', error);
      throw new SigninError('Failed to login');
    }
  }

  public logout(): void {
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
  }
}

export const signinService = SigninService.getInstance(); 