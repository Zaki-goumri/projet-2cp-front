import axios from '@/api/axios.config';
import { SearchResponse } from '@/modules/shared/types/search.types'; 

export class SearchService {
  private static instance :SearchService | null = null;
  private endpoints = {
    search: '/app/search/'
  };

  private constructor() {}

  public static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  public async search(query: string): Promise<SearchResponse> {
    try {
      const response = await axios.get<SearchResponse>(`${this.endpoints.search}?q=${encodeURIComponent(query)}`);

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
  }
}

export const searchService = SearchService.getInstance();