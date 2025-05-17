import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { opportunitiesService } from '../services/opportunities.service';
import { Opportunity, OpportunityFilterType } from '../types/opportunity.types';

export const useOpportunities = (searchQuery: string = '') => {
  const queryClient = useQueryClient();
  const [filterType, setFilterType] = useState<OpportunityFilterType>('both');

  const {
    data: allOpportunities = [],
    isLoading: isLoadingOpportunities,
    error: opportunitiesError,
  } = useQuery<Opportunity[], Error>({
    queryKey: ['opportunities'],
    queryFn: () => opportunitiesService.fetchOpportunities(),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const isLoading = isLoadingOpportunities;

  const error = useMemo(() => {
    const err = opportunitiesError;
    return err instanceof Error ? err : null;
  }, [opportunitiesError]);

  const filteredOpportunities = useMemo(() => {
    let typeFiltered = allOpportunities;
    if (filterType === 'internships') {
      typeFiltered = allOpportunities.filter(
        (opp) => opp.type === 'internship'
      );
    } else if (filterType === 'problems') {
      typeFiltered = allOpportunities.filter((opp) => opp.type === 'problem');
    }
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return typeFiltered;
    }

    return typeFiltered.filter((opp) => {
      return (
        opp.title?.toLowerCase().includes(query) ||
        opp.description?.toLowerCase().includes(query) ||
        opp.company?.name?.toLowerCase().includes(query) ||
        opp.worktype?.toLowerCase().includes(query) ||
        opp.skills?.some((skill) => skill.toLowerCase().includes(query))
      );
    });
  }, [allOpportunities, filterType, searchQuery]);

  const isEmpty = useMemo(() => {
    return !isLoading && !error && filteredOpportunities.length === 0;
  }, [isLoading, error, filteredOpportunities]);

  return {
    opportunities: filteredOpportunities,
    filterType,
    setFilterType,
    isLoading,
    error,
    isEmpty,
  };
};
