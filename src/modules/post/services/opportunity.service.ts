import axios from '@/api/axios.config';
import { Team, TeamMember, TeamsResponse } from '../types/team.types';
import { Opportunity, Company } from '../types/opportunity.types';

interface ApplicationResponse {
  details: string;
  data: {
    id: number;
    message: string;
    status: string;
    created_at: string;
  };
}

export class OpportunityService {
  private static instance: OpportunityService | null = null;
  private endpoints = {
    opportunities: '/post/opportunity/',
    internships: '/post/internship/',
    problems: '/post/problem/',
    search: '/app/search/',
    teams: '/post/team/',
    savedPosts: '/saved-posts/',
    applications: '/app/application/'
  };

  private constructor() {}

  public static getInstance(): OpportunityService {
    if (!OpportunityService.instance) {
      OpportunityService.instance = new OpportunityService();
    }
    return OpportunityService.instance;
  }

  // Team methods
  public async getAllTeams(): Promise<Team[]> {
    try {
      const response = await axios.get<TeamsResponse>(this.endpoints.teams);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }

  public searchTeams(teams: Team[], searchQuery: string): Team[] {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return teams;
    return teams.filter(team => team.name.toLowerCase().includes(query));
  }

  // Opportunity methods
  public async fetchOpportunities(): Promise<Opportunity[]> {
    const response = await axios.get(this.endpoints.opportunities);
    return response.data.results;
  }

  public async fetchOpportunityById(id: number): Promise<Opportunity> {
    const response = await axios.get(`${this.endpoints.opportunities}${id}/`);
    return response.data;
  }

  public async fetchInternships(): Promise<Opportunity[]> {
    const response = await axios.get(this.endpoints.internships);
    return response.data.results;
  }

  public async fetchProblems(): Promise<Opportunity[]> {
    const response = await axios.get(this.endpoints.problems);
    return response.data.results;
  }

  public async searchOpportunitiesAndCompanies(query: string): Promise<{ opportunity: Opportunity[], company: Company[] }> {
    const response = await axios.get(`${this.endpoints.search}?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  public async savePost(id: number): Promise<void> {
    await axios.post(this.endpoints.savedPosts, { post_id: id });
  }

  public async unsavePost(id: number): Promise<void> {
    await axios.delete(`${this.endpoints.savedPosts}${id}/`);
  }

  public async submitApplication(opportunityId: number, proposal: string, file: File | null, teamName?: string): Promise<ApplicationResponse> {
    const formData = new FormData();
    formData.append('proposal', proposal);
    
    if (file) {
      formData.append('file', file);
    }

    const response = await axios.post<ApplicationResponse>(
      `${this.endpoints.applications}${opportunityId}/`,
      formData,
      {
        params: { team: teamName || '' },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }
}

export const opportunityService = OpportunityService.getInstance(); 