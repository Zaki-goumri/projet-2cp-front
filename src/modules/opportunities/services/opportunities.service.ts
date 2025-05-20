import {
  Opportunity,
  SearchResults,
  Company,
} from '../types/opportunity.types';
import axios from '@/api/axios.config';
import { isAxiosError } from 'axios';

export class OpportunitiesService {
  private static instance: OpportunitiesService | null = null;
  private endpoints = {
    opportunities: '/post/opportunity/',
    internships: '/post/internship/',
    problems: '/post/problem/',
    search: '/app/search/',
    save: '/Auth/post/',
  };

  private constructor() {}

  public static getInstance(): OpportunitiesService {
    if (!OpportunitiesService.instance) {
      OpportunitiesService.instance = new OpportunitiesService();
    }
    return OpportunitiesService.instance;
  }

  public async fetchOpportunities(): Promise<Opportunity[]> {
    const response = await axios.get(this.endpoints.opportunities);
    return response.data;
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

  public async searchOpportunitiesAndCompanies(
    query: string
  ): Promise<{ opportunity: Opportunity[]; company: Company[] }> {
    const response = await axios.get(
      `${this.endpoints.search}?q=${encodeURIComponent(query)}`
    );
    return response.data;
  }
  public async savePost(id: number): Promise<String[]> {
    const response = await axios.post(`${this.endpoints.save}${id}/`);
    return response.data;
  }
}

export const opportunitiesService = OpportunitiesService.getInstance();

