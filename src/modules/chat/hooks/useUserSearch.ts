import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/user.service';
import { User } from '../types';
import { useDebounce } from '@/hooks/useDebounce';

export const useUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userSearch', debouncedSearch],
    queryFn: () =>
      userService.searchUsers({
        username: debouncedSearch,
        type: 'company', 
      }),
    enabled: debouncedSearch.length > 0,
    staleTime: 1000 * 60, // 1 minute
  });

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return {
    users,
    isLoading,
    error,
    searchTerm,
    handleSearch,
  };
}; 