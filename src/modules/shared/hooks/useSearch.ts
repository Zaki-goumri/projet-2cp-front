import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/modules/shared/services/searchService';
import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { SearchResponse } from '@/modules/shared/types/search.types';

const fetchSearchResults = async (query: string): Promise<SearchResponse> => {
  if (!query) {
    return { opportunity: [], company: [] };
  }
  return searchApi(query);
};

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, error, refetch } = useQuery<SearchResponse, Error>({
    queryKey: ['searchResults', debouncedSearchTerm],
    queryFn: () => fetchSearchResults(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
    staleTime: 5 * 60 * 1000,
  });

  const performSearch = (query: string) => {
    setSearchTerm(query);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      refetch();
    }
  }, [debouncedSearchTerm, refetch]);

  return {
    searchTerm,
    refetch,
    setSearchTerm: performSearch,
    results: data,
    isLoading,
    error,
  };
};


