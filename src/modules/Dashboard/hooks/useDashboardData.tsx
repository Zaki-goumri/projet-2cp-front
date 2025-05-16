import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { DashboardData } from '../types/dashboard.types';

export const useDashboardData = () => {
  return useQuery<DashboardData, Error>({
    queryKey: ['dashboardData'],
    queryFn: () => dashboardService.fetchDashboardData(),
    staleTime: 5 * 60 * 1000, 
    cacheTime: 15 * 60 * 1000,
  });
}; 