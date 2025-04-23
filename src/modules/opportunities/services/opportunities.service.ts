// import { mockOpportunities } from '../mocks/opportunities.mock';
import { Opportunity, SearchResults } from '../types/opportunity.types';
import axiosInstance from '@/api/axios.config';
import { isAxiosError } from 'axios';


const API_ENDPOINTS = {
  OPPORTUNITIES: '/post/opportunity/',
  OPPORTUNITY_DETAILS: (id: string | number) => `/app/opportunities/${id}/`,
  SEARCH: '/app/search/',
  SAVED_POSTS: '/saved-posts/',
  SAVE_POST: '/saved-posts/',
  UNSAVE_POST: (id: string | number) => `/saved-posts/${id}/`,
};

const fetchOpportunities = async (): Promise<Opportunity[]> => {
  console.log('Fetching opportunities from API...');
  try {
    const response = await axiosInstance.get<Opportunity[]>(API_ENDPOINTS.OPPORTUNITIES);
    console.log("Opportunities:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    throw error;
  }
};

const fetchOpportunityById = async (
  id: string | number,
): Promise<Opportunity | undefined> => {
  console.log(`Fetching opportunity with id: ${id} from API...`);
  try {
    const response = await axiosInstance.get<Opportunity>(API_ENDPOINTS.OPPORTUNITY_DETAILS(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching opportunity details for ID ${id}:`, error);
    if (isAxiosError(error) && error.response?.status === 404) {
      console.log(`Opportunity with ID ${id} not found (404).`);
      return undefined;
    }
    throw error;
  }
};

const fetchInternships = async (): Promise<Opportunity[]> => {
  console.log('Fetching internships - Consider client-side filtering or API param');
  throw new Error('fetchInternships not implemented with API');
};

const fetchProblems = async (): Promise<Opportunity[]> => {
  console.log('Fetching problems - Consider client-side filtering or API param');
  throw new Error('fetchProblems not implemented with API');
};


const searchOpportunitiesAndCompanies = async (query: string): Promise<SearchResults> => {
  if (!query) {
    return { opportunity: [], company: [] };
  }
  try {
    const response = await axiosInstance.get<SearchResults>(API_ENDPOINTS.SEARCH, {
      params: { q: query }
    });
    console.log("Search results:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error searching for query \"${query}\":`, error);
    return { opportunity: [], company: [] };
  }
};

const opportunitiesService = {
  fetchOpportunities,
  fetchOpportunityById,
  fetchInternships,
  fetchProblems,
  searchOpportunitiesAndCompanies,
};

export default opportunitiesService; 