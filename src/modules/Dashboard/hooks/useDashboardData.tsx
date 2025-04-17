import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData, TimeRange } from '../services/dashboardService';
// Remove strict typing to match actual data structure returned
// import { DashboardData } from '../types/dashboard.types';

export const useDashboardData = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');

  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
  } = useQuery(['dashboard'], () => fetchDashboardData(timeRange));

  return {
    dashboardData,
    isLoading,
    error,
    timeRange,
    setTimeRange,
    refetch,
  };
}; 