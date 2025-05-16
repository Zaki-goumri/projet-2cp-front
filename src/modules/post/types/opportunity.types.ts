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