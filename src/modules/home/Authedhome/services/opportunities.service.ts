import api from '@/api/axios.config';
import { OpportunitiesResponse } from '../types/opportunities.types';

const fetchOpportunities = async (type: 'Internship' | 'Problem'): Promise<OpportunitiesResponse> => {
  const { data } = await api.get<OpportunitiesResponse>(`/post/opportunity/explorer?type=${type}`);
  return data;
};

export const opportunitiesService = {
  fetchOpportunities,
}; 