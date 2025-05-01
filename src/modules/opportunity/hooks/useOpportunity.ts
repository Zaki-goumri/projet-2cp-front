import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import instance from '@/api/axios.config';
import { createInternshipService } from '../services/oppportunites.service';
import { useQuery } from '@tanstack/react-query';
import { opportunityService } from '../services/opportunity.service';

export type OpportunityData = {
  title: string;
  startdate: string;
  enddate: string;
  Type: string;
  workType: string;
  skills: string[];
  description: string;
};


export const useOpportunity = (id: string) => {
  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: () => opportunityService.getOpportunity(id),
    enabled: !!id,
  });
};
