import { User } from '@/modules/shared/store/userStore';

export type LoginResponse = {
  user: User;
  refresh: string;
  access: string;
};

export type LoginRequest = {
  password: string;
  email: string;
};
