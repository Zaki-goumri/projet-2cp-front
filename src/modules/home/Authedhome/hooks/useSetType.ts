import { useState } from 'react';
import { homeService } from '../services/home.service';

export const useSetType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setType = async (type: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await homeService.setUserType(type);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to set user type'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { setType, isLoading, error };
}; 