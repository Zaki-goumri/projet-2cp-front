import { useState, useEffect, useCallback } from 'react';
import { teamsService } from '../services/teams.service';
import { Team, CreateTeamRequest, TeamResponse } from '../types/teams.types';

const DEFAULT_LIMIT = 6;

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const fetchTeams = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response: TeamResponse = await teamsService.getTeams(page, DEFAULT_LIMIT);
      setTeams(response.results);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / DEFAULT_LIMIT));
      setHasNext(!!response.next);
      setHasPrevious(!!response.previous);
      setCurrentPage(page);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams(1); // Fetch first page on initial load
  }, [fetchTeams]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      fetchTeams(pageNumber);
    }
  };

  const goToNextPage = () => {
    if (hasNext) {
      fetchTeams(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPrevious) {
      fetchTeams(currentPage - 1);
    }
  };

  const createTeam = async (teamData: CreateTeamRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const newTeam = await teamsService.post_team_create(teamData);
      // Optionally refetch the first page or update state locally
      fetchTeams(1);
      return newTeam;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teams,
    createTeam,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalCount,
    hasNext,
    hasPrevious,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };
}; 