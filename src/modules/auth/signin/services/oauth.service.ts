import axios from '@/api/axios.config';
import { serialize } from 'cookie';
import { Student, Company } from '@/modules/shared/types/shared.types';

class OAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OAuthError';
  }
}

type OAuthResponse = {
  message: string;
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    name: string;
    picture?: string;
    type: string;
  };
};

export class OAuthService {
  private static instance: OAuthService | null = null;
  private readonly endpoints = {
    google: '/Auth/google',
    linkedin: '/Auth/linkedin'
  };

  private constructor() {}

  public static getInstance(): OAuthService {
    if (!OAuthService.instance) {
      OAuthService.instance = new OAuthService();
    }
    return OAuthService.instance;
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

  public async googleAuth(idToken: string): Promise<Omit<Student | Company, 'id' | 'location' | 'links' | 'role' | 'description' | 'skills' | 'education' | 'experience'| 'number'>> {
    try {
      const response = await axios.post<OAuthResponse>(this.endpoints.google, {
        id_token: idToken
      });

      this.setAuthCookies(response.data.access_token, response.data.refresh_token);

      return {
        name: response.data.user.name,
        email: response.data.user.email,
        type: response.data.user.type,
        profilepic: null,
        date_joined: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Google Authentication Error:', error);
      throw new OAuthError('Failed to authenticate with Google');
    }
  }

  public async linkedinAuth(accessToken: string): Promise<Omit<Student | Company, 'id' | 'location' | 'links' | 'role' | 'description' | 'skills' | 'education' | 'experience'| 'number'>> {
    try {
      const response = await axios.post<OAuthResponse>(this.endpoints.linkedin, {
        access_token: accessToken
      });

      this.setAuthCookies(response.data.access_token, response.data.refresh_token);

      return {
        name: response.data.user.name,
        email: response.data.user.email,
        type: response.data.user.type,
        profilepic: null,
        date_joined: new Date().toISOString(),
      };
    } catch (error) {
      console.error('LinkedIn Authentication Error:', error);
      throw new OAuthError('Failed to authenticate with LinkedIn');
    }
  }
}

export const oauthService = OAuthService.getInstance(); 