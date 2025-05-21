import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { chatService } from '../services/chat.service';
import { User } from '../types/chat.types';
import { useDebounce } from '@/modules/shared/hooks/useDebounce';
import { useUserStore } from '@/modules/shared/store/userStore';
export const useUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const userType = useUserStore((state) => state.user?.type);
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userSearch', debouncedSearch],
    queryFn: () =>
      chatService.searchUsers({
        username: debouncedSearch,
        type: userType?.toLowerCase() === 'company' ? 'Student' : 'Company',
      }),
    enabled: debouncedSearch.length > 0,
    staleTime: 1000 * 60,
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

