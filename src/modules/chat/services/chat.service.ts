import axios from '@/api/axios.config';
import { Conversation, ConversationResponse } from '../types';
import { toast } from 'react-toastify';

const CHAT_ENDPOINT = {
  CONVERSATION: '/chat/',
  CREATE_ROOM: '/chat/',
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

  parseConversationList(conversations: ConversationResponse[], user: any): Conversation[] | null  {
    if(!user){
      toast.error('your session is expired')
      return null
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
