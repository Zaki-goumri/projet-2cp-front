import { useState, useEffect } from 'react';
import { teamsService } from '../services/teams.service';
import { Team, TeamResponse } from '../types/teams.types';

export const useTeams = () => {
  const [activeTeams, setActiveTeams] = useState<Team[]>([]);
  const [suggestedTeams, setSuggestedTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const data = await teamsService.getTeams();
        setActiveTeams(data.activeTeams);
        setSuggestedTeams(data.suggestedTeams);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const createTeam = async (teamData: Partial<Team>) => {
    try {
      setIsLoading(true);
      setError(null);
      return await teamsService.createTeam(teamData);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { activeTeams, suggestedTeams, createTeam, isLoading, error };
}; 