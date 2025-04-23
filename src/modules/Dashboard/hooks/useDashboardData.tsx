import { useQuery } from '@tanstack/react-query';
import dashboardService from '../services/dashboardService';
import { DashboardData } from '../types/dashboard.types';

export const useDashboardData = () => {
 
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
  } = useQuery<DashboardData, Error>({ 
    queryKey: ['dashboardData'], 
    queryFn: dashboardService.fetchDashboardData, 
  });

  return {
    dashboardData,
    isLoading,
    error,
    refetch,
  };
}; 