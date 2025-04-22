import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import opportunitiesService from '../services/opportunities.service';
import { Opportunity, OpportunityFilterType } from '../types/opportunity.types';

export const useOpportunities = (searchQuery: string = '') => {
  const queryClient = useQueryClient();
  // State for the active filter type
  const [filterType, setFilterType] =
    useState<OpportunityFilterType>('both');

  // Fetch ALL opportunities
  const {
    data: allOpportunities = [],
    isLoading: isLoadingOpportunities,
    error: opportunitiesError,
  } = useQuery<Opportunity[], Error>({
    queryKey: ['opportunities'],
    queryFn: opportunitiesService.fetchOpportunities,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Fetch Saved Post IDs
  const {
    data: savedPostIds = new Set<string | number>(), // Default to empty set
    isLoading: isLoadingSavedIds,
    error: savedIdsError,
  } = useQuery<Set<string | number>, Error>({
    queryKey: ['savedPostIds'], // Query key for saved IDs
    queryFn: opportunitiesService.fetchSavedPostIds,
    staleTime: 2 * 60 * 1000, // Shorter stale time might be suitable
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true, // Refetch on focus might be good here
  });

  // Combined loading state
  const isLoading = isLoadingOpportunities || isLoadingSavedIds;

  // Combined error state (simplified: prioritize opportunities error)
  const error = useMemo(() => {
    const err = opportunitiesError || savedIdsError;
    return err instanceof Error ? err : null;
  }, [opportunitiesError, savedIdsError]);

  // --- Mutations for Save/Unsave ---
  const saveMutation = useMutation({
    mutationFn: opportunitiesService.savePost,
    onSuccess: (data, variables) => {
      // Invalidate and refetch savedPostIds query after mutation
      queryClient.invalidateQueries({ queryKey: ['savedPostIds'] });
      // Optionally, update the cache optimistically if needed
      console.log('Save successful for:', variables);
    },
    onError: (error) => {
      console.error('Error saving post:', error);
      // Handle error display (e.g., toast notification)
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: opportunitiesService.unsavePost,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['savedPostIds'] });
      console.log('Unsave successful for:', variables);
    },
    onError: (error) => {
      console.error('Error unsaving post:', error);
      // Handle error display
    },
  });
  // ---------------------------------

  // Filter data based on filterType AND searchQuery
  const filteredOpportunities = useMemo(() => {
    // 1. Filter by type (internship/problem/both)
    let typeFiltered = allOpportunities;
    if (filterType === 'internships') {
      typeFiltered = allOpportunities.filter((opp) => opp.type === 'internship');
    } else if (filterType === 'problems') {
      typeFiltered = allOpportunities.filter((opp) => opp.type === 'problem');
    } // 'both' includes all types

    // 2. Filter by search query
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return typeFiltered; // No search query, return type-filtered list
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

  // Check if the filtered list is empty
  const isEmpty = useMemo(() => {
    return !isLoading && !error && filteredOpportunities.length === 0;
  }, [isLoading, error, filteredOpportunities]);

  return {
    // Provide the final filtered list
    opportunities: filteredOpportunities,
    // Filter state and setter
    filterType,
    setFilterType,
    // Loading and error states from the single query
    isLoading,
    error,
    // Derived empty state
    isEmpty,
    // Saved state and actions
    savedPostIds,
    savePost: saveMutation.mutate,
    isSaving: saveMutation.isPending,
    unsavePost: unsaveMutation.mutate,
    isUnsaving: unsaveMutation.isPending,
    // Keep original data if needed elsewhere, though usually not required by UI
    // allOpportunities,
  };
}; 