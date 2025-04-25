import { useQuery } from '@tanstack/react-query';
import { opportunitiesService } from '../services/opportunities.service';
import { OpportunitiesResponse, Opportunity } from '../types/opportunities.types';

export const useOpportunities = (type: 'Internship' | 'Problem') => {
  const queryKey = ['opportunities', type]; 

  const { 
    data, 
    isLoading, 
    error, 
    isFetching 
  } = useQuery<OpportunitiesResponse, Error>(
    queryKey,
    () => opportunitiesService.fetchOpportunities(type),
    {
       staleTime: 5 * 60 * 1000, 
       cacheTime: 15 * 60 * 1000, 
      keepPreviousData: true,
    }
  );

  const opportunities: Opportunity[] = data?.results ?? [];

  return {
    opportunities,
    isLoading: isLoading || isFetching, 
    error,
  };
}; 