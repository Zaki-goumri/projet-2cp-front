import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { Message, Conversation } from '../types';
import { chatService } from '../services/chat.service';
import { WebSocketService } from '../services/websocket.service';

export const useChat = () => {
  // Initialize query client
  const queryClient = useQueryClient();

  // Local state for WebSocket and active conversation
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [wsService] = useState(() => new WebSocketService());
  const [error, setError] = useState<string | null>(null);

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
    enabled: !!currentUser,
    onSuccess: (data) => {
      if (data && data.length > 0 && !activeConversation) {
        setActiveConversation(data[0]);
      }
    },
  });

  // Fetch messages with infinite scrolling
  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchMessages,
  } = useInfiniteQuery({
    queryKey: ['messages', activeConversation?.roomName],
    queryFn: async ({ pageParam = 1 }) => {
      if (!activeConversation?.roomName) {
        throw new Error('No active conversation');
      }
      return chatService.getMessages(activeConversation.roomName, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!activeConversation?.roomName,
    refetchOnWindowFocus: false,
  });

  // Combine all messages from different pages and sort them by sentTime
  const messages = messagesData?.pages
    .flatMap((page) => page.messages)
    .sort((a, b) => new Date(a.sentTime).getTime() - new Date(b.sentTime).getTime()) ?? [];

  // Set error state if there's an error with conversations
  useEffect(() => {
    if (conversationsError && conversationsErrorData) {
      setError(
        (conversationsErrorData as Error)?.message || 'Failed to load conversations'
      );
    }
  }, [conversationsError, conversationsErrorData]);

  // Create a new conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: (userId: number) => chatService.createRoom(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      console.error('Failed to create conversation:', error);
      setError('Failed to create conversation');
    },
  });

  // Helper function to check if a message is duplicate
  const isDuplicateMessage = (newMessage: Message, existingMessages: Message[]) => {
    return existingMessages.some(
      (msg) =>
        msg.message === newMessage.message &&
        msg.sender === newMessage.sender &&
        Math.abs(new Date(msg.sentTime).getTime() - new Date(newMessage.sentTime).getTime()) < 1000
    );
  };

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

    const cleanup = wsService.onMessage((serverMessage) => {
      const newMessage: Message = {
        id: serverMessage.id,
        message: serverMessage.message,
        sender: serverMessage.sender,
        receiver: serverMessage.receiver,
        sentTime: new Date(serverMessage.sent_time),
      };

      queryClient.setQueryData(['messages', activeConversation.roomName], (oldData: any) => {
        if (!oldData?.pages?.[0]) {
          return {
            pages: [{
              messages: [newMessage],
              hasMore: false,
              totalCount: 1,
              nextPage: null
            }]
          };
        }

        const lastPage = oldData.pages[oldData.pages.length - 1];
        if (isDuplicateMessage(newMessage, lastPage.messages)) {
          return oldData;
        }

        return {
          ...oldData,
          pages: [
            ...oldData.pages.slice(0, -1),
            {
              ...lastPage,
              messages: [...lastPage.messages, newMessage],
            },
          ],
        };
      });

      // Update conversation in cache to show latest message
      queryClient.setQueryData(['conversations'], (oldData: Conversation[] | undefined) =>
        oldData?.map((conv) =>
          conv.id === activeConversation.id
            ? {
                ...conv,
                lastMessage: newMessage,
              }
            : conv
        )
      );
    });

    return () => {
      cleanup();
      wsService.disconnect();
    };
  }, [activeConversation?.roomName, activeConversation?.id, wsService, queryClient]);

  const selectConversation = useCallback((conversation: Conversation) => {
    setActiveConversation(conversation);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeConversation || !wsService.isConnected() || !currentUser)
        return;

      try {
        // Create a temporary message object
        const tempMessage: Message = {
          id: Date.now(),
          message: content,
          sender: currentUser.id,
          receiver: activeConversation.id,
          sentTime: new Date(),
        };

        // Send the message first
        wsService.sendMessage(content);

        // Update messages in the query cache
        queryClient.setQueryData(['messages', activeConversation.roomName], (oldData: any) => {
          if (!oldData?.pages?.[0]) {
            return {
              pages: [{
                messages: [tempMessage],
                hasMore: false,
                totalCount: 1,
                nextPage: null
              }]
            };
          }

          const lastPage = oldData.pages[oldData.pages.length - 1];
          if (isDuplicateMessage(tempMessage, lastPage.messages)) {
            return oldData;
          }

          return {
            ...oldData,
            pages: [
              ...oldData.pages.slice(0, -1),
              {
                ...lastPage,
                messages: [...lastPage.messages, tempMessage],
              },
            ],
          };
        });

        // Update conversation in cache to show latest message
        queryClient.setQueryData(['conversations'], (oldData: Conversation[] | undefined) =>
          oldData?.map((conv) =>
            conv.id === activeConversation.id
              ? {
                  ...conv,
                  lastMessage: tempMessage,
                }
              : conv
          )
        );
      } catch (err) {
        setError('Failed to send message');
        console.error('Error sending message:', err);
      }
    },
    [activeConversation, wsService, currentUser, queryClient]
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
    loadingMore: isFetchingNextPage,
    error,
    currentUser,
    hasMoreMessages: hasNextPage,
    loadMoreMessages: fetchNextPage,
    selectConversation,
    sendMessage,
    startNewConversation,
  };
};
