import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CreateInternshipForm } from '../components/opportunity.create';

export const useOpportunity = () => {
  return useMutation({
    mutationFn: async (data: CreateInternshipForm) => {
      const response = await axios.post('/post/create', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Opportunity created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create opportunity');
    },
  });
}; 