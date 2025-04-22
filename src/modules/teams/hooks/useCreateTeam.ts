import { useMutation } from '@tanstack/react-query'; 
import { teamsService } from '../services/teams.service';
import { Team, TeamApiError, CreateTeamRequest } from '../types/teams.types';

export const useCreateTeam = () => {
  const mutation = useMutation<Team, TeamApiError, CreateTeamRequest>({
    mutationFn: async (teamData) => {
      try {
        return await teamsService.post_team_create({
          name: teamData.name,
          emails: teamData.emails,
          description: teamData.description,
          category: teamData.category
        });
      } catch (err) {
        const error: TeamApiError = {
          message: err instanceof Error ? err.message : 'Failed to create team',
          status: 500,
        };
        throw error;
      }
    },
  });

  return {
    createTeam: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    team: mutation.data || null,
  };
};
