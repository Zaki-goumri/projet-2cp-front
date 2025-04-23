export interface Company {
  id: string | number; // Allow string ID for mock data
  name: string;
  email?: string;
  number?: string | null;
  type?: string;
  profilepic?: string | null;
  logoUrl?: string; 
  links?: string | null;
  date_joined?: string;
  location?: string | null;
  category?: string | null;
  industry?: string; // Added for potential use
  // Add other fields as needed
}

export interface Opportunity {
  id: string | number; // Allow string ID for mock data
  title: string;
  description: string;
  status?: string;
  type: 'internship' | 'problem'; // Use union type for clarity
  category?: string;
  skills: string[];
  endday?: string | null;
  worktype: string;
  views?: number; 
  company: Company;
  created_at?: string;
  duration?: string | null;
}

// If you have specific types for users, add them here
export interface User {
  id: string | number;
  name: string;
  email: string;
  // Add other relevant user fields
} 

// --- Types moved from page.tsx and hooks --- 

// Filter type from useOpportunities hook
export type OpportunityFilterType = 'internships' | 'problems' | 'both';

// Props for OpportunityCard component (from page.tsx)
export interface OpportunityCardProps {
  opportunity: Opportunity;
}

// Props for EmptyState component (from page.tsx)
export interface EmptyStateProps {
  filterType: OpportunityFilterType;
  searchQuery: string;
  message?: string;
}

// Props for ErrorState component (from page.tsx)
export interface ErrorStateProps {
  error: Error | null;
}

// --- Type for Search API Response ---
export interface SearchResults {
  opportunity: Opportunity[];
  company: Company[];
} 