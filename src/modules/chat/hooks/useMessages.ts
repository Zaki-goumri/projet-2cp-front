import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';
import { chatService } from '../services/chat.service';

interface UseMessagesProps {
  roomName: string | null;
  onError?: (error: string) => void;
}

interface UseMessagesReturn {
  messages: Message[];
  addNewMessage: (message: Message) => void;
  resetMessages: () => void;
}

export const useMessages = ({ roomName, onError }: UseMessagesProps): UseMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = useCallback(async () => {
    if (!roomName) return;
    
    try {
      const result = await chatService.getMessages(roomName);
      setMessages(result.messages);
    } catch (err) {
      console.error('Failed to load messages:', err);
      onError?.('Failed to load messages');
    }
  }, [roomName, onError]);

  const addNewMessage = useCallback((newMessage: Message) => {
    setMessages(prevMessages => {
      const isDuplicate = prevMessages.some(
        msg => msg.id === newMessage.id || 
        (msg.message === newMessage.message && 
         msg.sender === newMessage.sender && 
         Math.abs(new Date(msg.sentTime).getTime() - new Date(newMessage.sentTime).getTime()) < 1000)
      );
      
      if (isDuplicate) {
        return prevMessages;
      }
      return [...prevMessages, newMessage];
    });
  }, []);

  const resetMessages = useCallback(() => {
    setMessages([]);
    loadMessages();
  }, [loadMessages]);

  // Load initial messages when room changes
  useEffect(() => {
    if (roomName) {
      resetMessages();
    }
  }, [roomName, resetMessages]);

  return {
    messages,
    addNewMessage,
    resetMessages,
  };
}; 