import axios from '@/api/axios.config';
import { Opportunity } from '../types/opportunity.types';

const API_ENDPOINTS = {
  OPPORTUNITIES: '/post/opportunity',
  SAVED_POSTS: '/Auth/post',
  APPLIED_POSTS: '/Auth/applied'
};

const internshipsAndProblemsService = {
  async fetchOpportunities(): Promise<Opportunity[]> {
    try {
      console.log('Fetching opportunities...');
      const response = await axios.get(API_ENDPOINTS.OPPORTUNITIES);
      console.log('Opportunities response:', response);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      return [];
    }
  },

  async fetchSavedPosts(): Promise<Opportunity[]> {
    try {
      console.log('Fetching saved posts...');
      const response = await axios.get(API_ENDPOINTS.SAVED_POSTS);
      console.log('Saved posts response:', response);
      return response.data|| [];
    } catch (error) {
      console.error('Error fetching saved posts:', error);
      return [];
    }
  },

  async fetchInternships(): Promise<Opportunity[]> {
    try {
      console.log('Fetching internships...');
      const response = await axios.get(API_ENDPOINTS.OPPORTUNITIES);
      console.log('Internships response:', response);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching internships:', error);
      return [];
    }
  },

  async fetchProblems(): Promise<Opportunity[]> {
    try {
      console.log('Fetching problems...');
      const response = await axios.get(API_ENDPOINTS.OPPORTUNITIES);
      console.log('Problems response:', response);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching problems:', error);
      return [];
    }
  }
};

export default internshipsAndProblemsService;