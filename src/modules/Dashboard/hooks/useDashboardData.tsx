import { useQuery } from '@tanstack/react-query';
// Import the service object and the specific data type
import dashboardService from '../services/dashboardService';
import { DashboardData } from '../types/dashboard.types';

export const useDashboardData = () => {
  // Remove timeRange state if not needed for fetching by the new endpoint
  // const [timeRange, setTimeRange] = useState<TimeRange>('weekly');

  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
    // Update queryKey and queryFn
  } = useQuery<DashboardData, Error>({ // Add explicit types for data and error
    queryKey: ['dashboardData'], 
    queryFn: dashboardService.fetchDashboardData, // Call the correct service function
    // Add other React Query options as needed (e.g., staleTime, cacheTime)
  });

  return {
    dashboardData,
    isLoading,
    error,
    // Remove timeRange and setTimeRange if state was removed
    // timeRange,
    // setTimeRange,
    refetch,
  };
}; 