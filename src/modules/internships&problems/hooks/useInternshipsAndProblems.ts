import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useMemo } from 'react';
import internshipsAndProblemsService from '../services/internshipsAndProblems.service';
import { Opportunity } from '../types/opportunity.types';

export const useInternshipsAndProblems = (searchQuery: string = '') => {
  const [activeTab, setActiveTab] = useState('internships');
  const queryClient = useQueryClient();

  const {
    data: internships = [],
    isLoading: isInternshipsLoading,
    error: internshipsError,
  } = useQuery({
    queryKey: ['internships'],
    queryFn: () => internshipsAndProblemsService.fetchInternships(),
    enabled: activeTab === 'internships',
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const {
    data: problems = [],
    isLoading: isProblemsLoading,
    error: problemsError,
  } = useQuery({
    queryKey: ['problems'],
    queryFn: () => internshipsAndProblemsService.fetchProblems(),
    enabled: activeTab === 'problems',
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const {
    data: savedPosts = [],
    isLoading: isSavedPostsLoading,
    error: savedPostsError,
  } = useQuery({
    queryKey: ['savedPosts'],
    queryFn: () => internshipsAndProblemsService.fetchSavedPosts(),
    enabled: activeTab === 'saved',
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  // Filter data based on search query
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return { internships, problems, savedPosts };

    const filterOpportunities = (opportunities: Opportunity[]) =>
      opportunities.filter((opp) => {
        return (
          opp.title?.toLowerCase().includes(query) ||
          opp.description?.toLowerCase().includes(query) ||
          opp.company?.name?.toLowerCase().includes(query) ||
          opp.worktype?.toLowerCase().includes(query) ||
          opp.skills?.some(skill => skill.toLowerCase().includes(query))
        );
      });

    return {
      internships: filterOpportunities(internships),
      problems: filterOpportunities(problems),
      savedPosts: filterOpportunities(savedPosts)
    };
  }, [searchQuery, internships, problems, savedPosts]);

  const appliedInternships = internships.filter((opp: Opportunity) => opp.status);

  const isLoading = 
    (activeTab === 'internships' && isInternshipsLoading) ||
    (activeTab === 'problems' && isProblemsLoading) ||
    (activeTab === 'saved' && isSavedPostsLoading);

  const hasError = 
    (activeTab === 'internships' && internshipsError) ||
    (activeTab === 'problems' && problemsError) ||
    (activeTab === 'saved' && savedPostsError);

  const isEmpty = {
    internships: filteredData.internships.length === 0 && !isInternshipsLoading && !internshipsError,
    problems: filteredData.problems.length === 0 && !isProblemsLoading && !problemsError,
    savedPosts: filteredData.savedPosts.length === 0 && !isSavedPostsLoading && !savedPostsError,
    users: true,
    companies: true,
  };

  return {
    internships: filteredData.internships,
    problems: filteredData.problems,
    savedPosts: filteredData.savedPosts,
    appliedInternships,
    users: [],
    companies: [],
    isLoading,
    hasError,
    isEmpty,
    activeTab,
    setActiveTab
  };
};