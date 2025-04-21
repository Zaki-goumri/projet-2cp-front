import axios from '@/api/axios.config';
import { TeamResponse, Team, CreateTeamRequest } from '../types/teams.types';

export const teamsService = {
  async getTeams(): Promise<TeamResponse> {
    const response = await axios.get(`/teams`);
    return response.data;
  },

  async getTeamById(id: string): Promise<Team> {
    const response = await axios.get(`/teams/${id}`);
    return response.data;
  },

  async createTeam(teamData: CreateTeamRequest): Promise<Team> {
    const response = await axios.post('/post/team/', teamData);
    return response.data;
  },

  async post_team_create(data: {
    id: number;
    name: string;
    emails: string[];
  }): Promise<Team> {
    const response = await axios.post(`/post/team/`, data );
    return response.data;
  },

  async inviteMembers(teamId: string, emails: string[]): Promise<void> {
    await axios.post(`/teams/${teamId}/invite`, { emails });
  },

  async joinTeam(teamId: string): Promise<void> {
    await axios.post(`/teams/${teamId}/join`);
  },

  async leaveTeam(teamId: string): Promise<void> {
    await axios.post(`/teams/${teamId}/leave`);
  },
};
