import axios from '@/api/axios.config';

export interface Company {
  id: number;
  name: string;
  email: string;
  number: string | null;
  type: string;
  profilepic: string | null;
  links: string | null;
  date_joined: string;
  location: string | null;
  category: string | null;
}

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  markdown_content: string;
  status: 'open' | 'closed';
  Type: 'internship' | 'job';
  category: string;
  skills: string[];
  enddate: string | null;
  worktype: 'Online' | 'On-site' | 'Hybrid';
  company: Company;
  created_at: string;
  startdate: string | null;
}

export interface OpportunityResponse {
  details: string;
  data: Opportunity;
}

export const opportunityService = {
  getOpportunity: async (id: string): Promise<Opportunity> => {
    try {
      const response = await axios.get<OpportunityResponse>(`/post/opportunity/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching opportunity:', error);
      throw error;
    }
  },

  getMarkdownContent: (opportunity: Opportunity): string => {
    if (!opportunity.markdown_content) {
      const formattedDescription = opportunity.description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n\n');

      return `## Description\n\n${formattedDescription}`;
    }
    return opportunity.markdown_content;
  }
}; 