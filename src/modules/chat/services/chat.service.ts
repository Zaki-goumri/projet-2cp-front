import axios from '@/api/axios.config';
import { Conversation, ConversationResponse, Message } from '../types';
import { toast } from 'react-toastify';
import { Student, Company } from 'src/modules/shared/types/shared.types';
import { promises } from 'dns';

interface MessageResponse {
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

interface CreateRoomResponse {
  details?: string;
  chat: {
    id: number;
    student: {
      id: number;
      name: string;
      email: string;
      type: string;
      profilepic: string | null;
      // ... other student fields
    };
    company: {
      id: number;
      name: string;
      email: string;
      type: string;
      profilepic: string | null;
      // ... other company fields
    };
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

interface ChatService {
  getConversations: () => Promise<ConversationResponse[]>;
  getMessages: (roomName: string, page?: number) => Promise<any>;
  createRoom: (userId: number) => Promise<{ id: number; roomName: string }>;
  parseConversationList: (data: ConversationResponse[], currentUser: any) => Conversation[];
}

class ChatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChatError';
  }
}

const CHAT_ENDPOINT = {
  CONVERSATION: '/chat/',
  CREATE_ROOM: '/chat/',
  MESSAGES: '/chat/messages',
} as const;

export const chatService: ChatService = {
  async getConversations(): Promise<ConversationResponse[]> {
    const response = await axios.get(CHAT_ENDPOINT.CONVERSATION);
    return Array.isArray(response.data.results.chats)
      ? response.data.results.chats
      : [];
  },

  async getMessages(roomName: string, page: number = 1, limit: number = 20): Promise<{
    messages: Message[];
    hasMore: boolean;
    totalCount: number;
    nextPage: number | null;
  }> {
    try {
      const response = await axios.get<MessageResponse>(CHAT_ENDPOINT.MESSAGES, {
        params: {
          room_name: roomName,
          page,
          limit,
        },
      });

      const messages = response.data.results.messages.map((msg) => ({
        id: msg.id,
        message: msg.message,
        sender: msg.sender,
        receiver: msg.receiver,
        sentTime: new Date(msg.sent_time),
      }));

      return {
        messages,
        hasMore: !!response.data.next,
        totalCount: response.data.count,
        nextPage: response.data.next ? page + 1 : null,
      };
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw new Error('Failed to fetch messages');
    }
  },

  parseConversationList(
    conversations: ConversationResponse[],
    currentUser: any
  ): Conversation[] {
    if (!currentUser) {
      toast.error('your session is expired');
      return [];
    }
    return conversations.map((chat) => {
      return {
        id: chat.id,
        name:
          currentUser.id === chat.student.id ? chat.company.name : chat.student.name,
        avatar:
          currentUser.id === chat.student.id
            ? chat.company.profilepic
            : chat.student.profilepic,
        lastMessage: chat.last_message,
        email:
          currentUser.id === chat.student.id ? chat.company.email : chat.student.email,
        roomName: chat.room_name,
        userType:
          currentUser.id === chat.student.id ? chat.company.type : chat.student.type,
      };
    });
  },

  async createRoom(userId: number): Promise<{ id: number; roomName: string }> {
    try {
      const response = await axios.post<CreateRoomResponse>(`/chat/?user_id=${userId}`);
      const { chat } = response.data;
      
      return {
        id: chat.id,
        roomName: chat.room_name
      };
    } catch (error: any) {
      if (error.response?.status === 400) {
        // If chat already exists, the API still returns the chat data
        if (error.response.data?.chat) {
          const { chat } = error.response.data;
          return {
            id: chat.id,
            roomName: chat.room_name
          };
        }
        throw new Error('Invalid request. Please try again.');
      }
      throw new Error('Failed to create chat room.');
    }
  },
};
