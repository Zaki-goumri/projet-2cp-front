import { Student, Company } from '@/modules/shared/types/shared.types';

export interface User {
  id: number;
  name: string;
  email: string;
  number: string | null;
  type: 'Student' | 'Company';
  profilepic: string | null;
  links: string | null;
  date_joined: string;
  location: string | null;
  category: string | null;
  education?: any[];
  gendre?: string;
  description?: string | null;
  skills?: any[];
  rating?: number;
  cv?: string | null;
  experience?: any[];
}

export interface Message {
  id: number;
  message: string;
  sender: number;
  receiver: number;
  sentTime: Date;
}

export interface Chat {
  id: number;
  student: User;
  company: User;
  room_name: string;
  last_message: Message;
}

export interface ChatResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    details: string;
    chats: Chat[];
  };
}

export interface MessagesResponse {
  messages: Message[];
  hasMore: boolean;
  totalCount: number;
  nextPage: number | null;
}

export interface CreateChatResponse {
  details: string;
  chat: Chat;
}

export interface Conversation {
  id: number;
  name: string;
  avatar: string | null;
  lastMessage: {
    id: number;
    sender: number;
    receiver: number;
    sent_time: string;
    message: string;
  };
  email: string;
  roomName: string;
  userType: string;
}

export interface ConversationResponse {
  id: number;
  student: Student;
  company: Company;
  room_name: string;
  last_message: {
    id: number;
    sender: number;
    receiver: number;
    sent_time: string;
    message: string;
  };
}

export interface MessageResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    details: string;
    messages: {
      id: number;
      sender: number;
      receiver: number;
      sent_time: string;
      message: string;
    }[];
  };
}

export interface CreateRoomResponse {
  details?: string;
  chat: {
    id: number;
    student: Student;
    company: Company;
    room_name: string;
    last_message: {
      id: number;
      sender: number;
      receiver: number;
      sent_time: string;
      message: string;
    };
  };
}

export interface SearchUsersParams {
  username: string;
  type?: string;
} 