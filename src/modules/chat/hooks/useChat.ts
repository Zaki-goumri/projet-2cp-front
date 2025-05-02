import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { Message, Conversation } from '../types';
import { chatService } from '../services/chat.service';
import { WebSocketService } from '../services/websocket.service';
import { useNavigate } from 'react-router';

export const useChat = () => {
  // Initialize query client
  const queryClient = useQueryClient();

  // Local state for WebSocket and active conversation
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [wsService] = useState(() => new WebSocketService());
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // Get current user
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

  // Function to scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      navigate(`/chat/${data.id}`);
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
    let isSubscribed = true;

    const connectWebSocket = async () => {
      if (!activeConversation?.roomName) return;

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

        return cleanup;
      } catch (err: any) {
        if (!isSubscribed) return;
        
        if (err.message?.includes('invalid token')) {
          setError('Session expired. Please log in again.');
        } else {
          setError('Failed to connect to chat');
          console.error('WebSocket connection error:', err);
        }
      }
    };

    connectWebSocket();

    return () => {
      isSubscribed = false;
      wsService.disconnect();
    };
  }, [activeConversation?.roomName, activeConversation?.id, wsService, queryClient]);

  const selectConversation = useCallback(async (conversation: Conversation) => {
    try {
      // Disconnect from current WebSocket connection
      wsService.disconnect();
      
      // Clear any previous errors
      setError(null);
      
      // Set the new active conversation
      setActiveConversation(conversation);
      
      // Prefetch messages for the new conversation
      await queryClient.prefetchInfiniteQuery({
        queryKey: ['messages', conversation.roomName],
        queryFn: ({ pageParam = 1 }) => chatService.getMessages(conversation.roomName, pageParam),
      });
    } catch (err) {
      console.error('Error switching conversation:', err);
      setError('Failed to switch conversation');
    }
  }, [wsService, queryClient]);

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
        // Create a temporary message object
        const tempMessage: Message = {
          id: Date.now(),
          message: content,
          sender: currentUser.id,
          receiver: activeConversation.id,
          sentTime: new Date(),
        };

        // Send the message
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
    isCreatingChat: createConversationMutation.isLoading,
    messagesEndRef,
    scrollToBottom,
  };
};
