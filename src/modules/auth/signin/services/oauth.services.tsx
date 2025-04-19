import axios from '@/api/axios.config';
import { serialize } from 'cookie';
import { User } from '../types/signin.types';

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

/**
 * Authenticate user with Google OAuth
 * @param idToken Google ID token
 */
export const googleAuth = async (idToken: string): Promise<User> => {
  try {
    const response = await axios.post<OAuthResponse>('/Auth/google', {
      id_token: idToken
    });
    
    // Store tokens in cookies
    document.cookie = serialize('accessToken', response.data.access_token, {
      httpOnly: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
    });
    
    document.cookie = serialize('refreshToken', response.data.refresh_token, {
      httpOnly: false,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: '/',
    });
    
    // Return user data - ensure profilepic is null to match the User type
    return {
      id: 0, // ID will be assigned by backend
      name: response.data.user.name,
      email: response.data.user.email,
      number: null,
      type: response.data.user.type,
      profilepic: null, // Must be null to match User type
      date_joined: new Date().toISOString(),
      category: '',
    };
  } catch (error) {
    console.error('Google Authentication Error:', error);
    throw error;
  }
};

/**
 * Authenticate user with LinkedIn OAuth
 * @param accessToken LinkedIn access token
 */
export const linkedinAuth = async (accessToken: string): Promise<User> => {
  try {
    const response = await axios.post<OAuthResponse>('/Auth/linkedin', {
      access_token: accessToken
    });
    
    // Store tokens in cookies
    document.cookie = serialize('accessToken', response.data.access_token, {
      httpOnly: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
    });
    
    document.cookie = serialize('refreshToken', response.data.refresh_token, {
      httpOnly: false,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: '/',
    });
    
    // Return user data
    return {
      id: 0, // ID will be assigned by backend
      name: response.data.user.name,
      email: response.data.user.email,
      number: null,
      type: response.data.user.type,
      profilepic: null,
      date_joined: new Date().toISOString(),
      category: '',
    };
  } catch (error) {
    console.error('LinkedIn Authentication Error:', error);
    throw error;
  }
}; 