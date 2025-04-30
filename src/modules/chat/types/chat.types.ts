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
  sender: number;
  receiver: number;
  sent_time: string;
  message: string;
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
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    details: string;
    messages: Message[];
  };
}

export interface CreateChatResponse {
  details: string;
  chat: Chat;
}

export interface Conversation {
  id: number;
  name: string;
  avatar?: string;
  roomName: string;
  userType: string;
  email: string;
  lastMessage?: Message;
  lastMessageTime?: Date;
} 