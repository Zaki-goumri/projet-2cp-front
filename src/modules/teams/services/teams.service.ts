import axios from 'axios';
import { TeamResponse, Team } from '../types/teams.types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const teamsService = {
  async getTeams(): Promise<TeamResponse> {
    const response = await axios.get(`${API_URL}/teams`);
    return response.data;
  },

  async getTeamById(id: string): Promise<Team> {
    const response = await axios.get(`${API_URL}/teams/${id}`);
    return response.data;
  },

  async createTeam(teamData: Partial<Team>): Promise<Team> {
    const response = await axios.post(`${API_URL}/teams`, teamData);
    return response.data;
  },

  async inviteMembers(teamId: string, emails: string[]): Promise<void> {
    await axios.post(`${API_URL}/teams/${teamId}/invite`, { emails });
  },

  async joinTeam(teamId: string): Promise<void> {
    await axios.post(`${API_URL}/teams/${teamId}/join`);
  },

  async leaveTeam(teamId: string): Promise<void> {
    await axios.post(`${API_URL}/teams/${teamId}/leave`);
  }
}; 