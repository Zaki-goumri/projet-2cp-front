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
  type: 'internship' | 'problem';
  category: string;
  skills: string[];
  enddate: string | null;
  worktype: 'Online' | 'On-site' | 'Hybrid';
  company: Company;
  created_at: string;
  startdate: string | null;
}

export interface OpportunitiesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Opportunity[];
}

export interface OpportunityResponse {
  details: string;
  data: Opportunity;
}

export interface ApplicationResponse {
  details: string;
  data: {
    id: number;
    message: string;
    status: string;
    created_at: string;
  };
}

export interface SearchResponse {
  opportunity: Opportunity[];
  company: Company[];
}

export interface CreatePost {
  title: string;
  startdate: Date;
  enddate: Date;
  Type: string;
  workType: string;
  skills: string[];
  description: string;
  category: string;
  location: string;
}
