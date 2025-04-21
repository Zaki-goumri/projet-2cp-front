interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string | null;
}

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  role: string;
  skills: string[];
  education?: Education[];
  experience?: Experience[];
  createdAt: string;
}
