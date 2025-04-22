import { User } from '@/modules/shared/types/shared.types';

export interface ExperienceProps {
  isEditing: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface ResumeFile {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

export interface infoCardProps {
  icon: string;
  name: string;
  isAddeable: boolean;
  onAdd: () => void;
  children: string | JSX.Element | JSX.Element[];
}

export interface ProfileInfoProps {
  isEditing: boolean;
  onEditToggle: () => void;
  user?: User;
  isUserProfile: boolean;
}
