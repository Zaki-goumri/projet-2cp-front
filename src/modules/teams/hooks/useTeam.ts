import { useState, useEffect } from 'react';
import { teamsService } from '../services/teams.service';
import { Team, TeamApiError } from '../types/teams.types';

export const useTeam = (id: string) => {
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<TeamApiError | null>(null);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setNetworkError(false);
        setError(null);
        
        const data = await teamsService.getTeamById(id);
        setTeam(data);
      } catch (err) {
        console.error('Error fetching team:', err);
        
        // Check if it's a network error
        if (err instanceof Error && (
          err.message.includes('network') || 
          err.message.includes('connection') ||
          err.message.includes('ECONNREFUSED') ||
          err.message.includes('Failed to fetch')
        )) {
          setNetworkError(true);
          setError({
            message: 'Network error. Please check your connection and try again.',
            status: 500
          });
        } else {
          // Other API error
          setError({
            message: err instanceof Error ? err.message : 'Failed to fetch team',
            status: err instanceof Response ? err.status : 500
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  // Retry function to reload team data
  const retryFetch = async () => {
    try {
      setIsLoading(true);
      setNetworkError(false);
      setError(null);
      
      const data = await teamsService.getTeamById(id);
      setTeam(data);
    } catch (err) {
      console.error('Error fetching team on retry:', err);
      setError({
        message: err instanceof Error ? err.message : 'Failed to fetch team on retry',
        status: 500
      });
      setNetworkError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const inviteMembers = async (emails: string[]) => {
    try {
      await teamsService.inviteMembers(id, emails);
      return true;
    } catch (err) {
      console.error('Error inviting members:', err);
      return false;
    }
  };

  const leaveTeam = async () => {
    try {
      await teamsService.leaveTeam(id);
      return true;
    } catch (err) {
      console.error('Error leaving team:', err);
      throw err;
    }
  };

  return { 
    team, 
    isLoading, 
    error, 
    networkError, 
    inviteMembers, 
    leaveTeam,
    retryFetch
  };
}; 