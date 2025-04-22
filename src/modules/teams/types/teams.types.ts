import { User } from "@/modules/shared/store/userStore";

export interface Student extends User {
 
  number: string | null;
  student: {
    education: any[]; // to do
    gendre: string;
    description: string | null;
    skills: string[];
    rating: number;
    category: string | null;
    cv: string | null;
    experience: any[]; // to do
    savedposts: number[];
  };
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

// Added Invitation type
export interface Invitation {
  id: string; // Or number, depending on API
  team: {
    id: number;
    name: string;
  };
  // Add inviter info if available from API
  // inviter?: { id: number; name: string }; 
}
