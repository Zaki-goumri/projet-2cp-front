import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import internshipsAndProblemsService from '../services/internshipsAndProblems.service';
import { Opportunity } from '../types/opportunity.types';
import { Application, ApplicationResponse } from '../types/application.types';

export const useInternshipsAndProblems = (searchQuery: string = '') => {
  const [activeTab, setActiveTab] = useState('internships');


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
    refetchOnWindowFocus: false,
  });

  const {
    data: appliedResponse = { application: [] },
    isLoading: isAppliedPostsLoading,
    error: appliedPostsError,
  } = useQuery<ApplicationResponse>({
    queryKey: ['appliedPosts'],
    queryFn: () => internshipsAndProblemsService.fetchAppliedPosts(),
    enabled: activeTab === 'applied',
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const appliedInternships = appliedResponse.application;

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return {savedPosts, appliedInternships };

    const filterOpportunities = (opportunities: Opportunity[]) =>
      opportunities.filter((opp) => {
        return (
          opp.title?.toLowerCase().includes(query) ||
          opp.description?.toLowerCase().includes(query) ||
          opp.company?.name?.toLowerCase().includes(query) ||
          opp.worktype?.toLowerCase().includes(query) ||
          opp.skills?.some((skill) => skill.toLowerCase().includes(query))
        );
      });

    const filterApplications = (applications: Application[]) =>
      applications.filter((app) => {
        const post = app.post;
        return (
          post.title?.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query) ||
          post.company?.name?.toLowerCase().includes(query) ||
          post.worktype?.toLowerCase().includes(query) ||
          post.skills?.some((skill) => skill.toLowerCase().includes(query)) ||
          app.proposal?.toLowerCase().includes(query) ||
          app.team?.toLowerCase().includes(query)
        );
      });

    return {
      savedPosts: filterOpportunities(savedPosts),
      appliedInternships: filterApplications(appliedInternships),
    };
  }, [searchQuery, savedPosts, appliedInternships]);

  const isLoading =
    (activeTab === 'saved' && isSavedPostsLoading) ||
    (activeTab === 'applied' && isAppliedPostsLoading);

  const hasError =
    (activeTab === 'saved' && savedPostsError) ||
    (activeTab === 'applied' && appliedPostsError);

  const isEmpty = {  
    savedPosts:
      filteredData.savedPosts.length === 0 &&
      !isSavedPostsLoading &&
      !savedPostsError,
    appliedInternships:
      filteredData.appliedInternships.length === 0 &&
      !isAppliedPostsLoading &&
      !appliedPostsError,
    users: true,
    companies: true,
  };

  return {
    savedPosts: filteredData.savedPosts,
    appliedInternships: filteredData.appliedInternships,
    users: [],
    companies: [],
    isLoading,
    hasError,
    isEmpty,
    activeTab,
    setActiveTab,
  };
};
