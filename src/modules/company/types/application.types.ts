import { Attachment } from "@/modules/shared/types";

export interface ProfilePic {
  link: string;
  name: string;
  size: number;
  created_at: string;
}

export interface Education {
  degree: string;
  institution: string;
  start: string;
  end: string;
}

export interface Experience {
  title: string;
  company: string;
  start: string;
  end: string;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  number: string | null;
  type: string;
  profilepic: ProfilePic | null;
  links: string | null;
  date_joined: string;
  location: string | null;
  education: Education[];
  gendre: string;
  description: string | null;
  skills: string[];
  rating: number;
  category: string | null;
  cv: Attachment| null;
  experience: Experience[];
}

export interface TeamType {
  id: number;
  name: string;
  students: UserType[];
  leader: UserType;
  createdate: string;
  category: string;
  description: string;
}

export interface ApplicationType {
  id: number;
  title: string | null;
  team: TeamType | null;
  post_id:number|null
  proposal: string | null;
  status: string;
  atachedfile: Attachment| null;
  links: string | null;
}

export interface ApiResponse {
  application: ApplicationType;
  user: UserType | null;
  team: TeamType | null;
  type: 'user' | 'team';

  post_id?: number;
} 
