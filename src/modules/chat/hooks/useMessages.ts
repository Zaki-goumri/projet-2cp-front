import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';
import { chatService } from '../services/chat.service';

interface UseMessagesProps {
  roomName: string | null;
  onError?: (error: string) => void;
}

interface UseMessagesReturn {
  messages: Message[];
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMoreMessages: () => void;
  addNewMessage: (message: Message) => void;
  resetMessages: () => void;
}

export const useMessages = ({ roomName, onError }: UseMessagesProps): UseMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMessages = useCallback(async (page: number) => {
    if (!roomName) return;
    
    setIsLoadingMore(true);
    try {
      const result = await chatService.getMessages(roomName, page);
      
      setMessages(prevMessages => {
        if (page === 1) {
          return result.messages;
        }
        return [...result.messages, ...prevMessages];
      });
      
      setHasMore(result.hasMore);
      setCurrentPage(page);
    } catch (err) {
      console.error('Failed to load messages:', err);
      onError?.('Failed to load messages');
    } finally {
      setIsLoadingMore(false);
    }
  }, [roomName, onError]);

  const loadMoreMessages = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      loadMessages(currentPage + 1);
    }
  }, [hasMore, isLoadingMore, currentPage, loadMessages]);

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
    setCurrentPage(1);
    setHasMore(true);
    loadMessages(1);
  }, [loadMessages]);

  // Load initial messages when room changes
  useEffect(() => {
    if (roomName) {
      resetMessages();
    }
  }, [roomName, resetMessages]);

  return {
    messages,
    hasMore,
    isLoadingMore,
    loadMoreMessages,
    addNewMessage,
    resetMessages,
  };
}; 