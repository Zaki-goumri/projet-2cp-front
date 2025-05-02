import { Student, Company } from 'src/modules/shared/types/shared.types';
export interface Conversation {
  id: number;
  name: string;
  avatar: string | null;
  lastMessage: Message
  email: string | null;
  roomName: string;
  userType: string;
}

export interface ChatUser {
  id: number;
  name: string;
  email: string;
  number: string | null;
  type: string;
  profilepic: string | null;
}
export interface Message {
  id: number;
  message: string;
  receiver: number;
  sender: number;
  sentTime: Date;
}

export interface ConversationResponse {
  id: number;
  student: Student;
  company: Company;
  last_message: Message;
  room_name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  type: string;
  profilepic: string | null;
}
