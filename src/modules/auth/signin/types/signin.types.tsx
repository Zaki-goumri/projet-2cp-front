import { User } from '@/modules/shared/types/shared.types';

export type LoginResponse = {
  user: User;
  refresh: string;
  access: string;
};

export type LoginRequest = {
  password: string;
  email: string;
};
