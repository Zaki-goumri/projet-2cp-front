import axios from '@/api/axios.config'
import { User } from '@/modules/shared/store/userStore'

export async function getUserById(id:string):Promise<User>{
    const res=await axios.get<User>(`/Auth/user/${id}/`)
     if (res.status==200) {
        return res.data;
     }
     if (res.status==404){
        throw Promise.reject('user Not Found');
     }
     if (res.status==401){
        throw Promise.reject('Unauthorized');
     }
     throw Promise.reject('Unkown Error');
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  description?: string;
  skills?: string[];
  profilepic?: File;
  experience?: {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string | null;
  }[];
  education?: {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string | null;
  }[];
  cv?: File;
}

export async function updateUser(data: UpdateUserData): Promise<User> {
  const formData = new FormData();
  
  // Append all fields to formData if they exist
  if (data.name) formData.append('name', data.name);
  if (data.email) formData.append('email', data.email);
  if (data.description) formData.append('description', data.description);
  if (data.skills) formData.append('skills', JSON.stringify(data.skills));
  if (data.profilepic) formData.append('pic', data.profilepic);
  if (data.experience) formData.append('experience', JSON.stringify(data.experience));
  if (data.education) formData.append('education', JSON.stringify(data.education));
  if (data.cv) formData.append('cv', data.cv);

  const res = await axios.put<User>('/Auth/user', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (res.status === 200) {
    return res.data;
  }
  return Promise.reject('Failed to update user');
}
