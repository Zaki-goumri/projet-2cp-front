import axios from '@/api/axios.config';
import { SearchUser, SearchUserResponse } from '../types';

interface SearchUsersParams {
  username: string;
  type?: string;
}

export const userService = {
  /**
   * Search for users by username and optionally filter by type
   * @param params - Search parameters including username and optional type
   * @returns Promise with array of matching users
   */
  searchUsers: async ({ username, type }: SearchUsersParams): Promise<SearchUser[]> => {
    try {
      if (!username.trim()) {
        return [];
      }

      const params = new URLSearchParams();
      params.append('username', username);
    //   if (type) {
    //     params.append('type', type);
    //   }

      const response = await axios.get<SearchUserResponse>(`/post/user/search?${params.toString()}`);
      console.log(response)
      return response.data.results;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },
}; 