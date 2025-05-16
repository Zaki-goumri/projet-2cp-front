import axios from '@/api/axios.config';
import { toast } from 'react-toastify';
import {
  Conversation,
  ConversationResponse,
  Message,
  MessageResponse,
  CreateRoomResponse,
  SearchUsersParams,
  MessagesResponse
} from '../types/chat.types';
import { Student, Company } from 'src/modules/shared/types/shared.types';

class ChatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChatError';
  }
}

export class ChatService {
  private static instance: ChatService | null = null;
  private endpoints = {
    conversation: '/chat/',
    messages: '/chat/messages',
    userSearch: '/post/user/search'
  };

  private constructor() {}

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  public async getConversations(): Promise<ConversationResponse[]> {
    const response = await axios.get(this.endpoints.conversation);
    return Array.isArray(response.data.results.chats)
      ? response.data.results.chats
      : [];
  }

  public async getMessages(roomName: string, page: number = 1, limit: number = 20): Promise<MessagesResponse> {
    try {
      const response = await axios.get<MessageResponse>(this.endpoints.messages, {
        params: {
          room_name: roomName,
          page,
          limit,
        },
      });

      const messages = this.transformMessages(response.data.results.messages);

      return {
        messages,
        hasMore: !!response.data.next,
        totalCount: response.data.count,
        nextPage: response.data.next ? page + 1 : null,
      };
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw new ChatError('Failed to fetch messages');
    }
  }

  public parseConversationList(
    conversations: ConversationResponse[],
    currentUser: any
  ): Conversation[] {
    if (!currentUser) {
      toast.error('your session is expired');
      return [];
    }
    return conversations.map((chat) => this.transformConversation(chat, currentUser));
  }

  public async createRoom(userId: number): Promise<{ id: number; roomName: string }> {
    try {
      const response = await axios.post<CreateRoomResponse>(`${this.endpoints.conversation}?user_id=${userId}`);
      const { chat } = response.data;
      
      return {
        id: chat.id,
        roomName: chat.room_name
      };
    } catch (error: any) {
      if (error.response?.status === 400) {
        if (error.response.data?.chat) {
          const { chat } = error.response.data;
          return {
            id: chat.id,
            roomName: chat.room_name
          };
        }
        throw new ChatError('Invalid request. Please try again.');
      }
      throw new ChatError('Failed to create chat room.');
    }
  }

  public async searchUsers({ username, type }: SearchUsersParams) {
    try {
      if (!username.trim()) {
        return [];
      }

      const params = new URLSearchParams();
      params.append('username', username);
      if (type) {
        params.append('type', type);
      }

      const response = await axios.get(`${this.endpoints.userSearch}?${params.toString()}`);
      return response.data.results;
    } catch (error) {
      console.error('Error searching users:', error);
      throw new ChatError('Failed to search users');
    }
  }

  private transformMessages(messages: MessageResponse['results']['messages']): Message[] {
    return messages.map((msg) => ({
      id: msg.id,
      message: msg.message,
      sender: msg.sender,
      receiver: msg.receiver,
      sentTime: new Date(msg.sent_time),
    }));
  }

  private transformConversation(chat: ConversationResponse, currentUser: any): Conversation {
    const isStudent = currentUser.id === chat.student.id;
    return {
      id: chat.id,
      name: isStudent ? chat.company.name : chat.student.name,
      avatar: isStudent ? chat.company.profilepic : chat.student.profilepic,
      lastMessage: chat.last_message,
      email: isStudent ? chat.company.email : chat.student.email,
      roomName: chat.room_name,
      userType: isStudent ? chat.company.type : chat.student.type,
    };
  }
}

export const chatService = ChatService.getInstance();
