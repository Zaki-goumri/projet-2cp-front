import { useState, useEffect } from 'react';
import { teamsService } from '../services/teams.service';
import { Team, TeamApiError } from '../types/teams.types';

export const useTeam = (id: string) => {
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<TeamApiError | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamsService.getTeamById(id);
        setTeam(data);
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : 'Failed to fetch team',
          status: 500
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTeam();
    }
  }, [id]);

  const inviteMembers = async (emails: string[]) => {
    try {
      await teamsService.inviteMembers(id, emails);
    } catch (err) {
      throw err;
    }
  };

  const leaveTeam = async () => {
    try {
      await teamsService.leaveTeam(id);
    } catch (err) {
      throw err;
    }
  };

  return { team, isLoading, error, inviteMembers, leaveTeam };
}; 