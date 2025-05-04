import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teamsService } from '../services/teams.service';
import { toast } from 'react-toastify';

export const useTeamManagement = () => {
  const queryClient = useQueryClient();

  const kickMemberMutation = useMutation({
    mutationFn: async ({ teamId, memberId }: { teamId: number; memberId: number }) => {
      await teamsService.kickMember(teamId, memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      toast.success('Member removed successfully');
    },
    onError: (error) => {
      toast.error('Failed to remove member');
      console.error('Error kicking member:', error);
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: async (teamId: number) => {
      await teamsService.deleteTeam(teamId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Team deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete team');
      console.error('Error deleting team:', error);
    },
  });

  const leaveTeamMutation = useMutation({
    mutationFn: async (teamId: number) => {
      await teamsService.leaveTeam(teamId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast.success('Successfully left the team');
    },
    onError: (error) => {
      toast.error('Failed to leave team');
      console.error('Error leaving team:', error);
    },
  });

  return {
    kickMember: kickMemberMutation.mutateAsync,
    deleteTeam: deleteTeamMutation.mutateAsync,
    leaveTeam: leaveTeamMutation.mutateAsync,
    isKicking: kickMemberMutation.isLoading,
    isDeleting: deleteTeamMutation.isLoading,
    isLeaving: leaveTeamMutation.isLoading,
  };
}; 