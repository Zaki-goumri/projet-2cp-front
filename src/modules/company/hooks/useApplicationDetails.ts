import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplicationDetails } from '../services/applicationService';
import { selectBolk } from '../services/companyService';
import { ApiResponse } from '../types/application.types';
import { toast } from 'react-toastify';
import { queryClient } from '@/modules/shared/providers/queryClient';

export const useApplicationDetails = (id: string) => {

  const {
    data: fetchDetails,
    isLoading,
    error,
  } = useQuery<ApiResponse>({
    queryKey: ['application', id],
    queryFn: () => getApplicationDetails(id),
    enabled: !!id,
  });

  return { fetchDetails, isLoading, error };
};

export const useUpdateApplicationStatus = () => {
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: number;
      status: 'accepted' | 'rejected';
    }) => {
      try {
        // For now, hardcoding postId to 1 as requested
        const postId = 1;
        await selectBolk(
          postId,
          [id],
          status === 'accepted' ? 'ACCEPT' : 'REJECT'
        );
        queryClient.invalidateQueries(['application']);
        toast.success('Application status updated successfully!');
      } catch (error) {
        console.error('Error updating application status:', error);
        toast.error('Failed to update application status. Please try again.');
        throw error;
      }
    },
  });

  return {
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isLoading,
    updateError: updateStatusMutation.error,
  };
};

