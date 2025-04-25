import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios.config'; // Assuming your configured axios instance is exported as default
import { Invitation } from '../types/teams.types'; // Assuming Invitation type can be reused or adjust if needed
import { toast } from 'react-toastify'; // Import toast from react-toastify

interface SentInvitationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Invitation[]; // Adjust if the structure is different
}

const fetchSentInvitations = async (page: number): Promise<SentInvitationsResponse> => {
  const { data } = await api.get<SentInvitationsResponse>(`/post/team/inviter/?page=${page}`);
  return data;
};

const cancelSentInvitation = async (invitationId: number): Promise<void> => {
    await api.delete(`/post/team/inviter/`, { data: { invite_id: invitationId } });
};


export const useSentInvitations = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, isFetching } = useQuery<SentInvitationsResponse, Error>(
    ['sentInvitations', currentPage],
    () => fetchSentInvitations(currentPage),
    {
      keepPreviousData: true, 
    }
  );

 const cancelMutation = useMutation<void, Error, number>(
    cancelSentInvitation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sentInvitations']);
        toast.success('Invitation cancelled successfully!'); 
      },
      onError: (error) => {
        console.error("Failed to cancel invitation:", error);
        toast.error('Failed to cancel invitation. Please try again.'); 
      },
    }
  );


  const invitations = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / 10);
  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;

  const goToNextPage = () => {
    if (hasNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return {
    sentInvitations: invitations,
    isLoading: isLoading || isFetching, 
    error: error,
    cancelInvitation: cancelMutation.mutate, 
    isLoadingCancellation: cancelMutation.isLoading, 
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
    goToNextPage,
    goToPreviousPage,
  };
}; 