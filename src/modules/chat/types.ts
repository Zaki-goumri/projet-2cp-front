export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  isOnline?: boolean;
  email?: string;
  phoneNumber?: string;
}

export interface ChatState {
  messages: Message[];
  conversations: Conversation[];
  activeConversation: Conversation | null;
} 