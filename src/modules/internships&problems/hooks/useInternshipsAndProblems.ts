import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import internshipsAndProblemsService from '../services/internshipsAndProblems.service';
import { Opportunity } from '../types/opportunity.types';
import { Application, ApplicationResponse } from '../types/application.types';

export const useInternshipsAndProblems = (searchQuery: string = '') => {
  const [activeTab, setActiveTab] = useState('internships');

  const {
    data: savedPosts = [],
    isLoading: isSavedLoading,
    error: savedError
  } = useQuery({
    queryKey: ['savedPosts'],
    queryFn: () => internshipsAndProblemsService.fetchSavedPosts(),
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
  });

  const {
    data: appliedData = { application: [] },
    isLoading: isAppliedLoading,
    error: appliedError
  } = useQuery<ApplicationResponse>({
    queryKey: ['appliedPosts'],
    queryFn: () => internshipsAndProblemsService.fetchAppliedPosts(),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const appliedInternships = appliedData.application;

  const query = searchQuery.toLowerCase().trim();
  
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
        app.team.name?.toLowerCase().includes(query)
      );
    });

  const filteredData = {
    savedPosts: query ? filterOpportunities(savedPosts) : savedPosts,
    appliedInternships: query ? filterApplications(appliedInternships) : appliedInternships,
  };

  const isLoading = isSavedLoading || isAppliedLoading;
  const error = savedError || appliedError;

  const isEmpty = {
    savedPosts: filteredData.savedPosts.length === 0 && !isLoading && !error,
    appliedInternships: filteredData.appliedInternships.length === 0 && !isLoading && !error,
    users: true,
    companies: true,
  };

  return {
    savedPosts: filteredData.savedPosts,
    appliedInternships: filteredData.appliedInternships,
    users: [],
    companies: [],
    isLoading,
    hasError: !!error,
    isEmpty,
    activeTab,
    setActiveTab,
  };
};
