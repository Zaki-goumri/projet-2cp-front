  import axios from '@/api/axios.config';
import { TeamResponse, Team, InvitationResponse } from '../types/teams.types';
import { toast } from 'react-toastify';
export const teamsService = {
  async getTeams(page: number = 1, limit: number = 6): Promise<TeamResponse> {
    const response = await axios.get<TeamResponse>(`/post/team/`, {
      params: { page, limit },
    });
    return response.data;
  },

  async getTeamById(id: string): Promise<TeamResponse> {
    const response = await axios.get(`/post/team/${id}`);
    console.log(response.data);
    return response.data;
  },

  async post_team_create(data: {
    name: string;
    emails: string[];
    description: string;
    category: string;
  }): Promise<Team> {
    const response = await axios.post(`/post/team/`, data);
    return response.data;
  },

  async inviteMembers(teamId: string, emails: string[]): Promise<void> {
    await axios.post(`/teams/invite`, { "invite_emails": emails,"id": teamId });
  },

  async getInvitations(page: number = 1, limit: number = 5): Promise<InvitationResponse> {
    const response = await axios.get<InvitationResponse>('post/team/receiver/', {
      params: { page, limit },
    });
    return response.data;
  },

  async acceptInvitation(invitationId: number): Promise<void> {
    await axios.post('/post/team/receiver/', { invite_id: invitationId });
  },

  async declineInvitation(invitationId: number): Promise<void> {
    await axios.delete('/post/team/receiver/', { data: { invite_id: invitationId } });
  },

  async joinTeam(teamId: string): Promise<void> {
    await axios.post(`/teams/${teamId}/join`);
  },

  async leaveTeam(teamId: string): Promise<void> {
    await axios.delete(`/post/team/managing/`, { data: { team_id: teamId } }).then(() => {
      toast.success('Successfully left the team');
    }).catch((error) => {
      toast.error('Failed to leave team');
    });
  },
};
