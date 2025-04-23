import axios from '@/api/axios.config';
import { TeamResponse, Team } from '../types/teams.types';
import { Invitation } from '../types/teams.types';

export const teamsService = {
  async getTeams(): Promise<Team[]> {
    const response = await axios.get<TeamResponse>(`/post/team/`);
    return response.data.results;
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

  async getInvitations(): Promise<Invitation[]> {
    const response = await axios.get<Invitation[]>('post/team/inviter/', {
      params: { page: 1, limit: 5 },
    });
    console.log(response.data);
    return response.data;
  },

  async acceptInvitation(invitationId: string): Promise<void> {
    await axios.post(`/teams/invitations/${invitationId}/accept`);
  },

  async declineInvitation(invitationId: string): Promise<void> {
    await axios.post(`/teams/invitations/${invitationId}/decline`);
  },

  async joinTeam(teamId: string): Promise<void> {
    await axios.post(`/teams/${teamId}/join`);
  },

  async leaveTeam(teamId: string): Promise<void> {
    await axios.post(`/teams/${teamId}/leave`);
  },
};
