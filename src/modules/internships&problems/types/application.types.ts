import { Company } from './internshipsAndProblems.types';

export interface Post {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'closed';
  Type: 'internship' | 'problem';
  category: string;
  skills: string[];
  enddate: string | null;
  worktype: string;
  company: Company;
  created_at: string;
  startdate: string | null;
}

export interface Application {
  id: number;
  title: string | null;
  team: string | null;
  proposal: string;
  status: 'under_review' | 'accepted' | 'rejected' | 'pending';
  atachedfile: string | null;
  links: string | null;
  post: Post;
}

export interface ApplicationResponse {
  application: Application[];
} 