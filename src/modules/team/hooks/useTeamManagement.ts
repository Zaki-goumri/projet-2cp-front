import { useState } from 'react';
import { toast } from 'react-toastify';
import { teamManagementService } from '../services/teamManagement.service';

export const useTeamManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error: any) => {
    const message = error.response?.data?.details || 'An error occurred';
    toast.error(message);
  };

  const leaveTeam = async (teamId: number) => {
    try {
      setIsLoading(true);
      await teamManagementService.leaveTeam(teamId);
      toast.success('Successfully left the team');
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const kickMember = async (teamId: number, userId: number) => {
    try {
      setIsLoading(true);
      await teamManagementService.kickMember(teamId, userId);
      toast.success('Successfully removed member from the team');
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTeam = async (teamId: number) => {
    try {
      setIsLoading(true);
      await teamManagementService.deleteTeam(teamId);
      toast.success('Successfully deleted the team');
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    leaveTeam,
    kickMember,
    deleteTeam
  };
}; 