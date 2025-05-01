import { useMemo } from 'react';
import { Opportunity } from '../services/opportunity.service';
import { opportunityService } from '../services/opportunity.service';

export const useInternshipDetails = (opportunity: Opportunity) => {
  const markdownText = useMemo(() => {
    return opportunityService.getMarkdownContent(opportunity);
  }, [opportunity]);

  return {
    markdownText,
    isLoading: false,
    error: null
  };
}; 