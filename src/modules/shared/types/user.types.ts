export interface User {
  id: number;
  email: string;
  name: string;
  profilepic: string | null;
  type: string;
  role: 'Student' | 'Company';
  location: string | null;
  date_joined: string;
  links: string | null;
  description: string | null;
  number: string | null;
}

export interface Student extends User {
  cv: Attachment | null;
  education: EducationData[];
  experience: ExperienceData[];
  skills: string[];
  gender: string | null;
}

export interface Company extends User {}

import { Attachment } from './attachment.types';
import { EducationData } from './education.types';
import { ExperienceData } from './experience.types'; 