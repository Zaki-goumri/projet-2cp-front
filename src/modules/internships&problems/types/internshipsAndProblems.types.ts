export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  daysLeft: number;
  description: string;
  requirements: string[];
  skills: string[];
  category: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  isSaved?: boolean;
  isApplied?: boolean;
  status?: 'Accepted' | 'On Hold' | 'Refused' | 'Pending';
}

export interface Problem {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  deadline: string;
  createdAt: string;
  isSaved?: boolean;
  isSubmitted?: boolean;
}

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

export interface FilterOptions {
  category?: string;
  location?: string;
  status?: string;
}
