import { Company } from './internshipsAndProblems.types';


export interface Opportunity {
  id: number;
  title: string;
  description: string;
  status: string;
  Type: string;
  category: string;
  skills: string[];
  endday: string | null;
  worktype: string;
  company: Company;
  created_at: string;
  duration: string | null;
  isSaved: boolean;
}

export interface AppliedPostsApiResponse {
  post?: Opportunity[];
}
