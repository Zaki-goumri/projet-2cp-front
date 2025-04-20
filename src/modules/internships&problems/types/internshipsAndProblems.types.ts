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

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: 'Student' | 'Professional' | 'Admin';
  skills: string[];
  education: {
  institution: string;
    degree: string;
    startDate: string;
    endDate: string | null;
  }[];
  experience: {
    company: string;
    role: string;
    startDate: string;
    endDate: string | null;
  }[];
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  location: string;
  website: string;
  industry: string;
  size: 'Small' | 'Medium' | 'Large';
  foundedIn: string;
  createdAt: string;
  activeInternships: number;
  activeProblems: number;
}

export interface FilterOptions {
  category?: string;
  location?: string;
  status?: string;
} 