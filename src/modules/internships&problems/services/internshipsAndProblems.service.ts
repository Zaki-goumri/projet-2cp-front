import axios from '@/api/axios.config';
import { Opportunity } from '../types/opportunity.types';
import { ApplicationResponse } from '../types/application.types';

class InternshipsAndProblemsService {
  private static instance: InternshipsAndProblemsService | null = null;
  
  private readonly API_ENDPOINTS = {
    OPPORTUNITIES: '/post/opportunity',
    SAVED_POSTS: '/Auth/post',
    APPLIED_POSTS: '/app/application',
  };

  private constructor() {}

  public static getInstance(): InternshipsAndProblemsService {
    if (!InternshipsAndProblemsService.instance) {
      InternshipsAndProblemsService.instance = new InternshipsAndProblemsService();
    }
    return InternshipsAndProblemsService.instance;
  }

  public async fetchInternships(): Promise<Opportunity[]> {
    const response = await axios.get(
      `${this.API_ENDPOINTS.OPPORTUNITIES}?type=internship`
    );
    return response.data || [];
  }

  public async fetchProblems(): Promise<Opportunity[]> {
    const response = await axios.get(
      `${this.API_ENDPOINTS.OPPORTUNITIES}?type=problem`
    );
    return response.data || [];
  }

  public async fetchSavedPosts(): Promise<Opportunity[]> {
    const response = await axios.get(this.API_ENDPOINTS.SAVED_POSTS);
    return response.data || [];
  }

  public async fetchAppliedPosts(): Promise<ApplicationResponse> {
    const response = await axios.get(this.API_ENDPOINTS.APPLIED_POSTS);
    return response.data || { application: [] };
  }

  public async deleteApplication(id: number): Promise<void> {
    await axios.delete(`/app/applications/${id}/`);
  }

  public async unsavePost(id: number): Promise<void> {
    await axios.delete(`/Auth/post/${id}/`);
  }
}

const internshipsAndProblemsService = InternshipsAndProblemsService.getInstance();

export default internshipsAndProblemsService;
