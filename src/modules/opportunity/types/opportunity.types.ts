export interface Company {
  id: string;
  name: string;
  logo?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  company: Company;
  requirements?: string[];
  salary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityResponse {
  opportunities: Opportunity[];
  total: number;
  page: number;
  pageSize: number;
} 