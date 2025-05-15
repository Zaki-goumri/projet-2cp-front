import { User, Attachment } from '@/modules/shared/types';

export interface Student extends User {
  number: string | null;
  education: any[];
  gendre: string;
  skills: string[];
  rating: number;
  category: string | null;
  cv: Attachment | undefined | null;
  experience: any[];
  savedposts?: number[];
  links: any;
  location: any;
}

export interface TeamResponse {
  data: Team;
  
}

export interface Team {
  id: number;
  name: string;
  students: Student[];
  leader: Student;
  createdate: string;
  category: string;
  description: string | null;
}

export interface TeamResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Team[];
}

export interface TeamApiError {
  message: string;
  status: number;
}

export interface CreateTeamRequest {
  name: string;
  emails: string[];
  description: string;
  category: string;
}

export interface ActiveTeamsProps {
  team: Team;
}

export interface TeamProjectProps {
  name: string;
  members: number;
  description: string;
  onViewDetails?: () => void;
}

export interface Invitation {
  id: number;
  inviter: Student;
  receiver: Student;
  team: Team;
  status: string;
  createdate: string;
}

export interface InvitationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Invitation[];
}
