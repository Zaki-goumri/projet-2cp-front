import { useMemo } from 'react';
import { Opportunity } from '../types/opportunity.types';

export const useOpportunityDetails = (opportunity: Opportunity) => {
  const markdownText = useMemo(() => {
    return opportunity.markdown_content;
  }, [opportunity]);

  const formattedDate = useMemo(() => {
    if (!opportunity.enddate) return null;
    return new Date(opportunity.enddate).toLocaleDateString();
  }, [opportunity.enddate]);

  const isExpired = useMemo(() => {
    if (!opportunity.enddate) return false;
    return new Date(opportunity.enddate) < new Date();
  }, [opportunity.enddate]);

  return {
    markdownText,
    formattedDate,
    isExpired,
    isLoading: false,
    error: null,
  };
};
