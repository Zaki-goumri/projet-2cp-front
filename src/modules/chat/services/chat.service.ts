import axios from '@/api/axios.config';
import { Conversation, ConversationResponse, Message } from '../types';
import { toast } from 'react-toastify';

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

interface CreateChatResponse {
  id: number;
  room_name: string;
  student: {
    id: number;
    name: string;
    profilepic: string | null;
  };
  company: {
    id: number;
    name: string;
    profilepic: string | null;
  };
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

export const chatService = {
  async getConversations(): Promise<ConversationResponse[]> {
    const response = await axios.get(CHAT_ENDPOINT.CONVERSATION);
    return Array.isArray(response.data.results.chats)
      ? response.data.results.chats
      : [];
  },

  async createRoom(userId: number) {
    const response = await axios.post(CHAT_ENDPOINT.CREATE_ROOM, null, {
      params: { user_id: userId },
    });
    return response.data;
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
    user: any
  ): Conversation[] | null {
    if (!user) {
      toast.error('your session is expired');
      return null;
    }
    return conversations.map((chat) => {
      return {
        id: chat.id,
        name:
          user.id === chat.student.id ? chat.company.name : chat.student.name,
        avatar:
          user.id === chat.student.id
            ? chat.company.profilepic
            : chat.student.profilepic,
        lastMessage: chat.last_message,
        email:
          user.id === chat.student.id ? chat.company.email : chat.student.email,
        roomName: chat.room_name,
        userType:
          user.id === chat.student.id ? chat.company.type : chat.student.type,
      };
    });
  },

  createChat: async (userId: number): Promise<Conversation> => {
    try {
      const response = await axios.post<CreateChatResponse>('/chat/', {params:{
        user_id: userId,
      }});

      // Transform the response to match our Conversation type
      const chat = response.data;
      return {
        id: chat.id,
        name: chat.company.name, // We'll show the company name for students
        avatar: chat.company.profilepic,
        email: null,
        roomName: chat.room_name,
        userType: 'company',
        lastMessage: {
          id: 0,
          message: '',
          sender: 0,
          receiver: 0,
          sentTime: new Date(),
        },
      };
    } catch (error: any) {
      console.error('Error creating chat:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            throw new ChatError('Invalid request. Please try again.');
          case 401:
            throw new ChatError('Please log in to start a chat.');
          case 403:
            throw new ChatError('You are not allowed to start this chat.');
          case 404:
            throw new ChatError('User not found.');
          default:
            throw new ChatError('Failed to create chat. Please try again.');
        }
      }
      
      throw new ChatError('Network error. Please check your connection.');
    }
  },
};
