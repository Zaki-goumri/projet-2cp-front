import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Message, Conversation } from '../types';
import { chatService } from '../services/chat.service';
import { WebSocketService } from '../services/websocket.service';

export const useChat = () => {
  // Initialize query client
  const queryClient = useQueryClient();

  // Local state for WebSocket and active conversation
  const [activeConversation, setActiveConversation] = useState(null);
  const [wsService] = useState(() => new WebSocketService());
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Get current user from local storage
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
    staleTime: Infinity, // User info won't change during the session
  });

  // Fetch conversations
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

    enabled: !!currentUser, // Only run if currentUser exists
    onSuccess: (data) => {
      if (data && data.length > 0 && !activeConversation) {
        setActiveConversation(data[0]);
      }
    },
  });

  // Set error state if there's an error with conversations
  useEffect(() => {
    if (conversationsError && conversationsErrorData) {
      setError(
        conversationsErrorData.message || 'Failed to load conversations'
      );
    }
  }, [conversationsError, conversationsErrorData]);

  // Create a new conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: (userId) => chatService.createRoom(userId),
    onSuccess: (response) => {
      // Invalidate and refetch conversations
      queryClient.invalidateQueries({ queryKey: ['conversations'] });

      // Would set the active conversation here based on the response
      // if the response structure provided enough information
    },
    onError: (error) => {
      console.error('Failed to create conversation:', error);
      setError('Failed to create conversation');
    },
  });

  // WebSocket connection & message handling
  useEffect(() => {
    if (!activeConversation?.roomName) return;

    const token = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('accessToken='))
      ?.split('=')[1];

    if (!token) {
      setError('Authentication token not found');
      return;
    }

    wsService.connect(activeConversation.roomName, token).catch((err) => {
      if (err.message?.includes('invalid token')) {
        setError('Session expired. Please log in again.');
      } else {
        setError('Failed to connect to chat');
      }
      console.error(err);
    });

    const cleanup = wsService.onMessage((message) => {
      const newMessage = {
        message: message.message,
        sender: message.sender,
        receiver: activeConversation.id,
        sentTime: new Date(message.sentTime || Date.now()),
      };

      // Update conversation in cache to show latest message
      if (message.message) {
        queryClient.setQueryData(['conversations'], (oldData) =>
          oldData?.map((conv) =>
            conv.id === activeConversation.id
              ? {
                  ...conv,
                  lastMessage: message.message,
                  lastMessageTime: new Date(),
                }
              : conv
          )
        );
      }
    });

    return () => {
      cleanup();
      wsService.disconnect();
    };
  }, [activeConversation?.roomName, wsService, queryClient]);

  // Reset messages when conversation changes
  useEffect(() => {
    if (activeConversation) {
      setMessages([]);
    }
  }, [activeConversation]);

  const selectConversation = useCallback((conversation) => {
    setActiveConversation(conversation);
  }, []);

  const sendMessage = useCallback(
    async (content) => {
      if (!activeConversation || !wsService.isConnected() || !currentUser)
        return;

      try {
        wsService.sendMessage(content);

        const newMessage = {
          message: content,
          sender: currentUser.id,
          receiver: activeConversation.id,
          sentTime: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);

        // Update conversation in cache to show latest message
        queryClient.setQueryData(['conversations'], (oldData) =>
          oldData?.map((conv) =>
            conv.id === activeConversation.id
              ? {
                  ...conv,
                  lastMessage: content,
                  lastMessageTime: new Date(),
                }
              : conv
          )
        );
      } catch (err) {
        setError('Failed to send message');
        console.error(err);
      }
    },
    [activeConversation, wsService, currentUser, queryClient]
  );

  const startNewConversation = useCallback(
    (userId) => {
      if (!userId) return;
      createConversationMutation.mutate(userId);
    },
    [createConversationMutation]
  );

  return {
    messages,
    conversations,
    activeConversation,
    loading: conversationsLoading || createConversationMutation.isPending,
    error,
    currentUser,
    selectConversation,
    sendMessage,
    startNewConversation,
  };
};
