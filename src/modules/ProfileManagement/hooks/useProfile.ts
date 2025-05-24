import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services/profileService';

export const useProfile = () => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
  });

  return { profile, isLoading, error };
}; 