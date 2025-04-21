export interface Problem {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  difficulty: string;
  category: string;
  tags: string[];
  deadline: string;
  createdAt: string;
  isSaved?: boolean;
  isSubmitted?: boolean;
}
