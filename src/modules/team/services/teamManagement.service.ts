import axios from '@/api/axios.config';

interface TeamManagementResponse {
  details: string;
  data?: any;
}

export const teamManagementService = {
  leaveTeam: async (teamId: number): Promise<TeamManagementResponse> => {
    try {
      const response = await axios.post<TeamManagementResponse>('/post/team/managing/', {
        team_id: teamId
      });
      return response.data;
    } catch (error) {
      console.error('Error leaving team:', error);
      throw error;
    }
  },

  kickMember: async (teamId: number, userId: number): Promise<TeamManagementResponse> => {
    try {
      const response = await axios.put<TeamManagementResponse>('/post/team/managing/', {
        team_id: teamId,
        user_id: userId
      });
      return response.data;
    } catch (error) {
      console.error('Error kicking member:', error);
      throw error;
    }
  },

  deleteTeam: async (teamId: number): Promise<TeamManagementResponse> => {
    try {
      const response = await axios.delete<TeamManagementResponse>('/post/team/managing/', {
        data: { team_id: teamId }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  }
}; 