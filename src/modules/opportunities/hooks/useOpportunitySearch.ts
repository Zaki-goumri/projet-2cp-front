import { useQuery } from '@tanstack/react-query';
import opportunityService from '../services/opportunities.service';
import { SearchResults } from '../types/opportunity.types';


export const useOpportunitySearch = (query: string) => {
  
  const { 
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
    refetch: refetchSearch
  } = useQuery<SearchResults, Error>({ 
    queryKey: ['opportunitySearch', query],
    queryFn: () => opportunityService.searchOpportunitiesAndCompanies(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });

  return {
    searchResults,
    isSearchLoading,
    searchError,
    refetchSearch
  };
}; 