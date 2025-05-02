import axios from '@/api/axios.config';

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  profilepic: string | null;
}

export interface Team {
  id: number;
  name: string;
  createdate: string;
  students: TeamMember[];
  leader: TeamMember;
  category: string;
  description: string;
}

export interface TeamsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Team[];
}

export const teamService = {
  getAllTeams: async (): Promise<Team[]> => {
    try {
      const response = await axios.get<TeamsResponse>('/post/team/');
      console.log('Teams API Response:', response.data); // Debug log
      return response.data.results;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  },

  searchTeams: (teams: Team[], searchQuery: string): Team[] => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return teams;
    
    return teams.filter(team => 
      team.name.toLowerCase().includes(query)
    );
  }
}; 