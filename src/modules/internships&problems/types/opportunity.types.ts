export interface Company {
  id: number;
  name: string;
  email: string;
  number: string | null;
  type: string;
  profilepic: string | null;
  links: string | null;
  date_joined: string;
  location: string | null;
  category: string | null;
}

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
}
