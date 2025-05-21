import axios from '@/api/axios.config';
import externalApi from 'axios';
import { Team, TeamMember, TeamsResponse } from '../types/team.types';
import {
  Opportunity,
  Company,
  OpportunityResponse,
  createPost,
} from '../types/opportunity.types';

interface ApplicationResponse {
  details: string;
  data: {
    id: number;
    message: string;
    status: string;
    created_at: string;
  };
}
export class OpportunityService {
  private static instance: OpportunityService | null = null;
  private endpoints = {
    opportunity: '/post/opportunity/',
    search: '/app/search/',
    teams: '/post/team/',
    applications: '/app/application/',
    savedPosts: '',
    postCreation: '/post/opportunity/',
  };

  private constructor() {}

  public static getInstance(): OpportunityService {
    if (!OpportunityService.instance) {
      OpportunityService.instance = new OpportunityService();
    }
    return OpportunityService.instance;
  }

  // Team methods
  public async getAllTeams(): Promise<Team[]> {
    try {
      const response = await axios.get<TeamsResponse>(this.endpoints.teams);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }

  public async createPost(form: createPost): Promise<void> {
    await axios.post(this.endpoints.postCreation, { ...form });
  }

  /**
   * Converts any text content to markdown format using Google's Gemini API
   * @param content The text content to convert to markdown
   * @returns A promise containing the markdown representation of the content
   */
  public async getMarkdownContent(content: string): Promise<string> {
    if (!content) return '';

    const GEMINI_URL = import.meta.env.VITE_GEMINI_URL;
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!GEMINI_URL || !GEMINI_API_KEY) {
      console.warn('Missing Gemini config.');
      return `# Content\n\n${content}`;
    }

    try {
      const response = await externalApi.post(
        `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: `Make this content markdown:\n\n${content}` }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const markdown = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      return markdown || `# Content\n\n${content}`;
    } catch (error: any) {
      console.error('Error converting to markdown with Gemini:', error.message);
      return `# Content\n\n${content}`;
    }
  }

  public searchTeams(teams: Team[], searchQuery: string): Team[] {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return teams;
    return teams.filter((team) => team.name.toLowerCase().includes(query));
  }

  public async fetchOpportunityById(id: string): Promise<OpportunityResponse> {
    const response = await axios.get(`${this.endpoints.opportunity}${id}`);
    console.log(response);
    return response.data;
  }

  public async savePost(id: number): Promise<void> {
    await axios.post(this.endpoints.savedPosts, { post_id: id });
  }

  public async unsavePost(id: number): Promise<void> {
    await axios.delete(`${this.endpoints.savedPosts}${id}/`);
  }

  public async submitApplication(
    opportunityId: number,
    proposal: string,
    file: File | null,
    teamName?: string
  ): Promise<ApplicationResponse> {
    const formData = new FormData();
    formData.append('proposal', proposal);

    // Append the file if it exists
    if (file) {
    console.log('File:', file);
      formData.append('attechment', file);
    }
    const response = teamName
      ? await axios.post<ApplicationResponse>(
          `${this.endpoints.applications}${opportunityId}/`,
          formData,
          {
            params: {
              team: teamName,
            },
          }
        )
      : await axios.post<ApplicationResponse>(
          `${this.endpoints.applications}${opportunityId}/`,
          formData
        );
    return response.data;
  }
}

export const opportunityService = OpportunityService.getInstance();
