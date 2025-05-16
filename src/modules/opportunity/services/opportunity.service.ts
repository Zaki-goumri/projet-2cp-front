import axios from '@/api/axios.config';
import { Opportunity, OpportunityResponse } from '../types/opportunity.types';

class OpportunityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpportunityError';
  }
}

export class OpportunityService {
  private static instance: OpportunityService | null = null;
  private readonly endpoints = {
    opportunities: '/Opportunities',
    opportunity: (id: string) => `/Opportunities/${id}`,
    save: (id: string) => `/Opportunities/${id}/save`,
    unsave: (id: string) => `/Opportunities/${id}/unsave`,
    teams: '/Teams',
    searchTeams: '/Teams/search'
  };

  private constructor() {}

  public static getInstance(): OpportunityService {
    if (!OpportunityService.instance) {
      OpportunityService.instance = new OpportunityService();
    }
    return OpportunityService.instance;
  }

  public async fetchOpportunities(): Promise<Opportunity[]> {
    try {
      const response = await axios.get<OpportunityResponse>(this.endpoints.opportunities);
      return response.data.opportunities || [];
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      throw new OpportunityError('Failed to fetch opportunities');
    }
  }

  // ... rest of the service methods ...
}

export const opportunityService = OpportunityService.getInstance(); 