export interface User {
  id: number;
  name: string;
  email: string;
  number: null;
  type: string;
  profilepic: null;
  date_joined: string;
  category: string;
}
export type RegisterResponse = {
  user: User,
  refresh: string,
  access: string
};

export interface RegisterRequest {
  name: string;
  email: string;
  type: 'company' | 'student';
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}
