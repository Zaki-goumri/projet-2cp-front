export type User = {
  id: number;
  name: string;
  email: string;
  number: null;
  type: string;
  profilepic: null;
  date_joined: string;
  category: string;
};
export type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    number: null;
    type: string;
    profilepic: null;
    date_joined: string;
    category: string;
  };
  refresh: string;
  access: string;
};

export type LoginRequest = {
  password: string;
  email: string;
};
