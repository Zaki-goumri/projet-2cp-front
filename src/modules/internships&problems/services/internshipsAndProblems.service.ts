import axios from '@/api/axios.config';
import { Opportunity } from '../types/opportunity.types';
import { Application, ApplicationResponse } from '../types/application.types';

const API_ENDPOINTS = {
  OPPORTUNITIES: '/post/opportunity',
  SAVED_POSTS: '/Auth/post',
  APPLIED_POSTS: '/app/application',
};

const internshipsAndProblemsService = {
  async fetchInternships(): Promise<Opportunity[]> {
    const response = await axios.get(`${API_ENDPOINTS.OPPORTUNITIES}?type=internship`);
    return response.data || [];
  },

  async fetchProblems(): Promise<Opportunity[]> {
    const response = await axios.get(`${API_ENDPOINTS.OPPORTUNITIES}?type=problem`);
    return response.data || [];
  },

  async fetchSavedPosts(): Promise<Opportunity[]> {
    const response = await axios.get(API_ENDPOINTS.SAVED_POSTS);
    return response.data || [];
  },

  async fetchAppliedPosts(): Promise<ApplicationResponse> {
    const response = await axios.get(API_ENDPOINTS.APPLIED_POSTS);
    return response.data || { application: [] };
  },

  async deleteApplication(id: number): Promise<void> {
    await axios.delete(`/app/applications/${id}/`);
  },

  async unsavePost(id: number): Promise<void> {
    await axios.delete(`/Auth/post/${id}/`);
  },
};

export default internshipsAndProblemsService;
