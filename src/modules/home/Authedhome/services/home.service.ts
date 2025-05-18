import axios from '@/api/axios.config';
import { OpportunitiesResponse } from '../types/opportunities.types';

export class HomeService {
  private static instance: HomeService | null = null;
  private endpoints = {
    opportunities: '/post/opportunity/explorer',
    userType: '/Auth/usertype',
  };

  private constructor() {}

  public static getInstance(): HomeService {
    if (!HomeService.instance) {
      HomeService.instance = new HomeService();
    }
    return HomeService.instance;
  }

  public async fetchOpportunities(
    type: 'internship' | 'problem'
  ): Promise<OpportunitiesResponse> {
    const { data } = await axios.get<OpportunitiesResponse>(
      `${this.endpoints.opportunities}?type=${type}`
    );
    return data;
  }

  public async setUserType(type: string): Promise<any> {
    try {
      const response = await axios.put(this.endpoints.userType, { type });
      if (response.status !== 200) {
        throw new Error('Failed to set user type');
      }
      console.log('User type set successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error setting user type:', error);
      throw error;
    }
  }
}

const homeService = HomeService.getInstance();
export default homeService;

