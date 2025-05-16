export interface CompanyDetails {
  id: number;
  name: string;
  email?: string;
  location?: string | null;
}

export interface CompanyResultItem {
  id: number;
  name: string;
  email?: string;
  location?: string | null;
  type?: string;
  profilepic?: string;
}

export interface OpportunityResultItem {
  id: number;
  title: string;
  description?: string;
  Type?: string; // API uses 'Type'
  category?: string;
  skills?: string[]; // API uses 'skills'
  worktype?: string;
  company: CompanyDetails; // Nested company object
}

export interface SearchResponse {
  opportunity: OpportunityResultItem[];
  company: CompanyResultItem[];
} 