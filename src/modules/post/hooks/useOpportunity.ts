import { useQuery } from '@tanstack/react-query';
import { opportunityService } from '../services/opportunity.service.ts';

export const useOpportunity = (id: string) => {
  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: () => opportunityService.fetchOpportunityById(id),
    enabled: !!id,
  });
};
