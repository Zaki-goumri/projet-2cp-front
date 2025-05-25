import axios from '@/api/axios.config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import externalApi from 'axios';
import { Team, TeamMember, TeamsResponse } from '../types/team.types';
import {
  Opportunity,
  Company,
  OpportunityResponse,
  CreatePost,
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
    savedPosts: '/Auth/post/',
    postCreation: '/post/opportunity/',
  };
  private readonly MODEL_NAME = 'gemini-1.5-flash-latest';
  private constructor() {}

  public static getInstance(): OpportunityService {
    if (!OpportunityService.instance) {
      OpportunityService.instance = new OpportunityService();
    }
    return OpportunityService.instance;
  }

  public async getAllTeams(): Promise<Team[]> {
    try {
      const response = await axios.get<TeamsResponse>(this.endpoints.teams);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }

  public async createPost(form: CreatePost): Promise<void> {
    await axios.post(this.endpoints.postCreation, { ...form });
  }

  /**
   * Converts any text content to markdown format using Google's Gemini Flash API
   * @param content The text content to convert to markdown
   * @returns A promise containing the markdown representation of the content
   */
  public async getMarkdownContent(content: string): Promise<string> {
    if (!content) return '';

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.warn('Missing Gemini API key configuration.');
      return content;
    }

    try {
      // Initialize Gemini AI with the same pattern as GlobalErrorService
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: this.MODEL_NAME,
        generationConfig: {
          temperature: 0.1,
          topK: 32,
          topP: 0.9,
          maxOutputTokens: 2048,
        },
      });

      const prompt = `Convert the following content to clean, well-formatted markdown. Preserve the structure and meaning while improving readability. Return ONLY the markdown content without any additional explanations:

${content}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const markdown = response.text();

      return markdown?.trim() || content;
    } catch (error: any) {
      console.error(
        'Error converting to markdown with Gemini Flash:',
        error.message
      );
      return content;
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
    await axios.post(`${this.endpoints.savedPosts}${id}/`);
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
    const form = new FormData();
    form.append('proposal', proposal);
    if (file) {
      form.append('attechment', file);
      console.log(file);
    }
    const response = teamName
      ? await axios.postForm<ApplicationResponse>(
          `${this.endpoints.applications}${opportunityId}/`,

          { proposal, attechment: file },
          {
            params: {
              team: teamName,
            },
          }
        )
      : await axios.postForm<ApplicationResponse>(
          `${this.endpoints.applications}${opportunityId}/`,
          { proposal, attechment: file }
        );
    console.log(response);
    return response.data;
  }
}

export const opportunityService = OpportunityService.getInstance();
