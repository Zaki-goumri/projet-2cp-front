export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
}

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

export interface EducationData {
  id: string;
  institution: string;
  degree: string;
  start: string;
  end: string | null;
  createdAt?: string;
  updatedAt?: string;
}
