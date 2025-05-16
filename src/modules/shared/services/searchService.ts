import axios from '@/api/axios.config';
import { SearchResponse, OpportunityResultItem, CompanyResultItem } from '@/modules/shared/types/search.types'; // Import shared types


export const searchApi = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await axios.get<SearchResponse>(`/app/search/?q=${encodeURIComponent(query)}`);

    const data = response.data;

    if (!data || typeof data !== 'object' || !Array.isArray(data.opportunity) || !Array.isArray(data.company)) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid API response structure');
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch search results:', error);
    throw error;
  }
}; 