import { useState, useEffect, useCallback } from 'react';
import { Invitation, InvitationResponse } from '../types/teams.types';  
import { teamsService } from '../services/teams.service';

const DEFAULT_LIMIT = 5;

export const useInvitations = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const fetchInvitations = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response: InvitationResponse = await teamsService.getInvitations(page, DEFAULT_LIMIT);
      setInvitations(response.results);
      setTotalCount(response.count);
      setTotalPages(Math.ceil(response.count / DEFAULT_LIMIT));
      setHasNext(!!response.next);
      setHasPrevious(!!response.previous);
      setCurrentPage(page);

      console.log('State updated successfully.');

    } catch (err) {
      console.error('Failed to fetch invitations (in catch block):', err);
      setError(err as Error);
      setInvitations([]);
      console.log('Error set due to fetch exception.');
    } finally {
      setIsLoading(false);
      console.log('fetchInvitations finally block executed.');
    }
  }, []);

  useEffect(() => {
    console.log('useInvitations useEffect triggered.');
    fetchInvitations(1); 
  }, [fetchInvitations]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      fetchInvitations(pageNumber);
    }
  };

  const goToNextPage = () => {
    if (hasNext) {
      fetchInvitations(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPrevious) {
      fetchInvitations(currentPage - 1);
    }
  };

  const handleAccept = async (invitationId: string) => {
    try {
      await teamsService.acceptInvitation(invitationId);
      // Refetch current page to reflect the change
      fetchInvitations(currentPage);
    } catch (err) {
      console.error("Failed to accept invitation:", err);
      // Optionally: set an error state specific to this action
    }
  };

  const handleDecline = async (invitationId: string) => {
    try {
      await teamsService.declineInvitation(invitationId);
      // Refetch current page to reflect the change
      fetchInvitations(currentPage);
    } catch (err) {
      console.error("Failed to decline invitation:", err);
      // Optionally: set an error state specific to this action
    }
  };

  return {
    invitations,
    isLoading,
    error,
    acceptInvitation: handleAccept,
    declineInvitation: handleDecline,
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