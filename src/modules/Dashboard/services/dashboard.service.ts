import axios from '@/api/axios.config';
import { DashboardData } from '../types/dashboard.types';

export class DashboardService {
  private static instance: DashboardService | null = null;
  private endpoints = {
    dashboard: '/post/student/dashboard'
  };

  private constructor() {}

  public static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService();
    }
    return DashboardService.instance;
  }

  public async fetchDashboardData(): Promise<DashboardData> {
    try {
      const response = await axios.get<DashboardData>(this.endpoints.dashboard);
      console.log("Dashboard data fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }
}

export const dashboardService = DashboardService.getInstance(); 