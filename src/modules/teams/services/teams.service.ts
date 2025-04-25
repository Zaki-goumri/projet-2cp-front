import axios from '@/api/axios.config';
import { TeamResponse, Team, InvitationResponse, Invitation } from '../types/teams.types';

export const teamsService = {
  async getTeams(page: number = 1, limit: number = 6): Promise<TeamResponse> {
    const response = await axios.get<TeamResponse>(`/post/team/`, {
      params: { page, limit },
    });
    return response.data;
  },

  async getTeamById(id: string): Promise<Team> {
    const response = await axios.get(`/teams/${id}`);
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
    await axios.post(`/teams/${teamId}/invite`, { emails });
  },

  async getInvitations(page: number = 1, limit: number = 5): Promise<InvitationResponse> {
    const response = await axios.get<InvitationResponse>('post/team/inviter/', {
      params: { page, limit },
    });
    return response.data;
  },

  async acceptInvitation(invitationId: string): Promise<void> {
    await axios.post('/post/team/receiver/', { invite_id: invitationId });
  },

  async declineInvitation(invitationId: string): Promise<void> {
    await axios.delete('/post/team/receiver/', { data: { invite_id: invitationId } });
  },

  async joinTeam(teamId: string): Promise<void> {
    await axios.post(`/teams/${teamId}/join`);
  },

  async leaveTeam(teamId: string): Promise<void> {
    await axios.post(`/teams/${teamId}/leave`);
  },
};
