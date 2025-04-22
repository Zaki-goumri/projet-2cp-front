import axios from '@/api/axios.config';
import { User } from '@/modules/shared/store/userStore';

export async function getUserById(id: string): Promise<User> {
  const res = await axios.get<User>(`/Auth/user/${id}/`);
  if (res.status == 200) {
    return res.data;
  }
  if (res.status == 404) {
    throw Promise.reject('user Not Found');
  }
  if (res.status == 401) {
    throw Promise.reject('Unauthorized');
  }
  throw Promise.reject('Unkown Error');
}

export async function updateUserProfile(data: Partial<User>): Promise<User> {
  const response = await axios.put<User>(`/Auth/usertype`, data);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error('Failed to update profile');
}
