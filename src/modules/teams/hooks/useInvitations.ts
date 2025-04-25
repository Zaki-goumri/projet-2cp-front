import { useState, useEffect, useCallback } from 'react';
import { Invitation, InvitationResponse } from '../types/teams.types';  
import { teamsService } from '../services/teams.service';
import { toast } from 'react-toastify';

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
      console.log(response);
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

  const handleAccept = async (invitationId: number) => {
    try {
      await teamsService.acceptInvitation(invitationId);
      toast.success('Invitation accepted successfully!');
      fetchInvitations(currentPage);
    } catch (err) {
      console.error("Failed to accept invitation:", err);
      toast.error('Failed to accept invitation. Please try again.');
    }
  };

  const handleDecline = async (invitationId: number) => {
    try {
      await teamsService.declineInvitation(invitationId);
      toast.success('Invitation declined.');
      fetchInvitations(currentPage);
    } catch (err) {
      console.error("Failed to decline invitation:", err);
      toast.error('Failed to decline invitation. Please try again.');
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