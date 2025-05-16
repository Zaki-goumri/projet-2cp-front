export interface TeamMember {
  id: number;
  name: string;
  email: string;
  profilepic: string | null;
}

export interface Team {
  id: number;
  name: string;
  createdate: string;
  students: TeamMember[];
  leader: TeamMember;
  category: string;
  description: string;
}

export interface TeamsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Team[];
} 