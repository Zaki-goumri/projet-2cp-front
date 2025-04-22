import { User } from '@/modules/shared/types/shared.types';

export type RegisterResponse = {
  user: User;
  refresh: string;
  access: string;
};

export interface RegisterRequest {
  name: string;
  email: string;
  type: 'company' | 'student';
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}
