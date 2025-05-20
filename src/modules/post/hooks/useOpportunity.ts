import { useMutation } from '@tanstack/react-query';
import { opportunityService } from '../services/opportunity.service.ts';
import { createPost } from '../types/opportunity.types.ts';
import { toast } from 'react-toastify';
import { globalErrorService } from '@/modules/shared/services/global-error.serivce';
export const useOpportunity = () => {
  return useMutation({
    mutationFn: (form: createPost) => {
      return opportunityService.createPost(form);
    },
    onSuccess: () => {
      toast.success('posted successfully');
    },
    onError: async (err) => {
      const errorMessage =
        await globalErrorService.getErrorHandlingMessage(err);
      toast.error(errorMessage || 'un error occured');
    },
  });
};
