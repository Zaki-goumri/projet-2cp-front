import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import instance from '@/api/axios.config';
import { createInternshipService } from '../services/oppportunites.service';

export type OpportunityData = {
  title: string;
  startdate: string;
  enddate: string;
  Type: string;
  workType: string;
  skills: string[];
  description: string;
};


export const useOpportunity = () => {
  const navigate = useNavigate();
  const succesUrl="/"
  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: createInternshipService,
    onSuccess: () => {
      toast.success('Opportunity created successfully!');
      navigate(succesUrl);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create opportunity');
    },
  });

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
