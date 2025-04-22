import { useState, useEffect } from 'react';
import { teamsService } from '../services/teams.service';
import { Team, CreateTeamRequest } from '../types/teams.types';

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const fetchedTeams = await teamsService.getTeams();
        setTeams(fetchedTeams);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const createTeam = async (teamData: CreateTeamRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      return await teamsService.post_team_create(teamData);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { teams, createTeam, isLoading, error };
}; 