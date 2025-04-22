export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  daysLeft?: number;
  description: string;
  requirements?: string[];
  skills: string[];
  category: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  isSaved?: boolean;
  isApplied?: boolean;
  status?: string;
}

