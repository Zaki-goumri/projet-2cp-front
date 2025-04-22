import { useState, useEffect } from 'react';
import { Invitation } from '../types/teams.types';  
import { teamsService } from '../services/teams.service';

export const useInvitations = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchInvitations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedInvitations = await teamsService.getInvitations();
      setInvitations(fetchedInvitations);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const handleAccept = async (invitationId: string) => {
    try {
      await teamsService.acceptInvitation(invitationId);
      // Refetch invitations or remove the accepted one from state
      setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
      // Optionally show success toast
    } catch (err) {
      // Optionally show error toast
      console.error("Failed to accept invitation:", err);
    }
  };

  const handleDecline = async (invitationId: string) => {
    try {
      await teamsService.declineInvitation(invitationId);
      // Refetch invitations or remove the declined one from state
      setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
      // Optionally show success toast
    } catch (err) {
      // Optionally show error toast
      console.error("Failed to decline invitation:", err);
    }
  };

  return {
    invitations,
    isLoading,
    error,
    acceptInvitation: handleAccept,
    declineInvitation: handleDecline,
  };
}; 