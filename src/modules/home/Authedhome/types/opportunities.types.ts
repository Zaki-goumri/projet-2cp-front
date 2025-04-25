export interface Company {
  id: number;
  name: string;
  email: string;
  number: string | null;
  type: string; // Should ideally be 'Company' based on response
  profilepic: string | null;
  links: string | null; // Assuming string, adjust if it's an object/array
  date_joined: string;
  location: string | null; // Assuming string, adjust if object
  category: string | null;
}

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  status: string; // e.g., 'open'
  Type: 'Internship' | 'Problem'; // Note the uppercase 'T' from the response
  category: string; // e.g., 'EC'
  skills: string[];
  endday: string | null; // Date string or null
  worktype: string; // e.g., 'Onsite'
  company: Company;
  created_at: string; // Date string
  duration: string | null; // Assuming string representation or null
}

export interface OpportunitiesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Opportunity[];
}

// Interface for the card props
export interface OpportunityCardProps {
  opportunity: Opportunity;
} 