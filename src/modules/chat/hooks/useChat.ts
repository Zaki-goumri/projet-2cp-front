import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Message, Conversation } from '../types';
import { chatService } from '../services/chat.service';
import { WebSocketService } from '../services/websocket.service';
import { useNavigate } from 'react-router';
import { useMessages } from './useMessages';

export const useChat = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [wsService] = useState(() => new WebSocketService());
  const [error, setError] = useState<string | null>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    hasMore,
    isLoadingMore,
    loadMoreMessages,
    addNewMessage,
  } = useMessages({
    roomName: activeConversation?.roomName || null,
    onError: setError
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => {
      const userInfo = localStorage.getItem('user-storage');
      if (!userInfo) return null;
      try {
        const parsedUserData = JSON.parse(userInfo);
        const userData = parsedUserData.state.user;
        if (userData && userData.id) return userData;
        return null;
      } catch (err) {
        console.error('Error parsing user data:', err);
        throw new Error('Failed to load user data');
      }
    },
    staleTime: Infinity,
  });

  const {
    data: conversations,
    isLoading: conversationsLoading,
    isError: conversationsError,
    error: conversationsErrorData,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      try {
        const data = await chatService.getConversations();
        const parsedUser = chatService.parseConversationList(data, currentUser);
        return parsedUser;
      } catch (err) {
        console.error('Failed to load conversations:', err);
        throw new Error('Failed to load conversations');
      }
    },
    enabled: !!currentUser,
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const createConversationMutation = useMutation({
    mutationFn: (userId: number) => chatService.createRoom(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      navigate(`/chat/${data.id}`);
    },
    onError: (error) => {
      console.error('Failed to create conversation:', error);
      setError('Failed to create conversation');
    },
  });

  useEffect(() => {
    let isSubscribed = true;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = async () => {
      if (!activeConversation?.roomName || !currentUser) return;

      const token = document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) {
        setError('Authentication token not found');
        return;
      }

      try {
        // Disconnect from previous connection if any
        wsService.disconnect();
        
        // Connect to new room
        await wsService.connect(activeConversation.roomName, token);
        
        if (!isSubscribed) return;

        const cleanup = wsService.onMessage((serverMessage) => {
          if (!isSubscribed) return;

          const newMessage: Message = {
            id: serverMessage.id,
            message: serverMessage.message,
            sender: serverMessage.sender,
            receiver: serverMessage.receiver,
            sentTime: new Date(serverMessage.sent_time),
          };

          addNewMessage(newMessage);

          // Update conversation in cache
          queryClient.setQueryData(['conversations'], (oldData: Conversation[] | undefined) =>
            oldData?.map((conv) =>
              conv.id === activeConversation.id
                ? { ...conv, lastMessage: newMessage }
                : conv
            )
          );
        });

        return cleanup;
      } catch (err: any) {
        if (!isSubscribed) return;
        
        if (err.message?.includes('invalid token')) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Failed to connect to chat');
          console.error('WebSocket connection error:', err);
          
          // Attempt to reconnect after a delay
          reconnectTimeout = setTimeout(() => {
            if (isSubscribed) {
              connectWebSocket();
            }
          }, 5000);
        }
      }
    };

    // Initial connection
    connectWebSocket();

    // Cleanup function
    return () => {
      isSubscribed = false;
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      wsService.disconnect();
    };
  }, [activeConversation?.roomName, activeConversation?.id, wsService, queryClient, addNewMessage, currentUser]);

  const selectConversation = useCallback(async (conversation: Conversation) => {
    try {
      wsService.disconnect();
      setError(null);
      setActiveConversation(conversation);
    } catch (err) {
      console.error('Error switching conversation:', err);
      setError('Failed to switch conversation');
    }
  }, [wsService]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeConversation || !currentUser) {
        setError('No active conversation or user not logged in');
        return;
      }

      if (!wsService.isConnected()) {
        try {
          const token = document.cookie
            .split(';')
            .find((cookie) => cookie.trim().startsWith('accessToken='))
            ?.split('=')[1];

          if (!token) {
            setError('Authentication token not found');
            return;
          }

          await wsService.connect(activeConversation.roomName, token);
        } catch (err) {
          setError('Failed to reconnect to chat');
          console.error('Error reconnecting:', err);
          return;
        }
      }

      try {
        const tempMessage: Message = {
          id: Date.now(),
          message: content,
          sender: currentUser.id,
          receiver: activeConversation.id,
          sentTime: new Date(),
        };

        wsService.sendMessage(content);
        addNewMessage(tempMessage);

        queryClient.setQueryData(['conversations'], (oldData: Conversation[] | undefined) =>
          oldData?.map((conv) =>
            conv.id === activeConversation.id
              ? { ...conv, lastMessage: tempMessage }
              : conv
          )
        );
      } catch (err) {
        setError('Failed to send message');
        console.error('Error sending message:', err);
      }
    },
    [activeConversation, wsService, currentUser, queryClient, addNewMessage]
  );

  const startNewConversation = useCallback(
    (userId: number) => {
      if (!userId) return;
      createConversationMutation.mutate(userId);
    },
    [createConversationMutation]
  );

  return {
    messages,
    conversations,
    activeConversation,
    loading: conversationsLoading,
    loadingMore: isLoadingMore,
    error,
    currentUser,
    hasMoreMessages: hasMore,
    loadMoreMessages,
    selectConversation,
    sendMessage,
    startNewConversation,
    isCreatingChat: createConversationMutation.isLoading,
    messagesEndRef,
    scrollToBottom,
  };
};
