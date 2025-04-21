export interface Team {
  id: string;
  name: string;
  members: number;
  projects: number;
  status: 'ACTIVE' | 'INACTIVE';
  icon?: string;
  description?: string;
}

export interface TeamResponse {
  activeTeams: Team[];
  suggestedTeams: Team[];
}

export interface TeamApiError {
  message: string;
  status: number;
}

export interface CreateTeamRequest {
  name: string;
  emails: string[];
}