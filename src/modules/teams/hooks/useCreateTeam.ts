import { useState } from 'react';
import { teamsService } from '../services/teams.service';
import { Team, TeamApiError } from '../types/teams.types';

export const useCreateTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TeamApiError | null>(null);
  const [team, setTeam] = useState<Team | null>(null);

  const createTeam = async (teamData: Partial<Team>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newTeam = await teamsService.createTeam(teamData);
      setTeam(newTeam);
      return newTeam;
    } catch (err) {
      const error: TeamApiError = {
        message: err instanceof Error ? err.message : 'Failed to create team',
        status: 500
      };
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTeam, isLoading, error, team };
}; 