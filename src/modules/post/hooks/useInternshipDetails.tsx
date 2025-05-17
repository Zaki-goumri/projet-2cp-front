import { useQuery } from '@tanstack/react-query';
import { opportunityService } from '../services/opportunity.service';
import { Opportunity } from '../types/opportunity.types';

export const useInternshipDetails = (opportunity: Opportunity) => {
  const {
    data: markdownText = '',
    isLoading,
    error
  } = useQuery(
    ['internshipMarkdown', opportunity.id, opportunity.description],
    () => opportunityService.getMarkdownContent(opportunity.description),
    {
      enabled: !!opportunity?.description,
    }
  );

  return {
    markdownText,
    isLoading,
    error,
  };
};