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
};
