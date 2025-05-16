import { useState, useEffect } from 'react';
import homeService from '../services/home.service';
import { OpportunitiesResponse } from '../types/opportunities.types';

export const useOpportunities = (type: 'Internship' | 'Problem') => {
  const [opportunities, setOpportunities] =
    useState<OpportunitiesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await homeService.fetchOpportunities(type);
        setOpportunities(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { opportunities, isLoading, error };
};

