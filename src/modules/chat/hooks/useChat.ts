import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Message, Conversation } from '../types';
import { chatService } from '../services/chat.service';
import { WebSocketService } from '../services/websocket.service';
import { useNavigate } from 'react-router';
import { useMessages } from './useMessages';
import { toast } from 'react-toastify';
import { useUserStore } from '@/modules/shared/store/userStore';

export const useChat = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const wsService = useRef(WebSocketService.getInstance()).current;
  const [error, setError] = useState<string | null>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const { messages, hasMore, isLoadingMore, loadMoreMessages, addNewMessage } = useMessages({
    roomName: activeConversation?.roomName || null,
    onError: setError,
  });
  
  const currentUser = useUserStore((state) => state.user);
  
  const { data: conversations, isLoading: isLoadingConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await chatService.getConversations();
      return chatService.parseConversationList(response, currentUser);
    },
    enabled: !!currentUser,
  });

  const { data: messagesData, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', selectedRoom],
    queryFn: () => selectedRoom ? chatService.getMessages(selectedRoom) : null,
    enabled: !!selectedRoom,
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const createRoomMutation = useMutation({
    mutationFn: (userId: number) => chatService.createRoom(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      toast.error('Failed to create chat room');
    },
  });

  const searchUsersMutation = useMutation({
    mutationFn: (params: { username: string; type?: string }) => chatService.searchUsers(params),
  });

  const handleRoomSelect = (roomName: string) => {
    setSelectedRoom(roomName);
  };

  const handleCreateRoom = async (userId: number) => {
    try {
      const { roomName } = await createRoomMutation.mutateAsync(userId);
      setSelectedRoom(roomName);
      return roomName;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  };

  const handleSearchUsers = async (username: string, type?: string) => {
    try {
      return await searchUsersMutation.mutateAsync({ username, type });
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  };

  // Get auth token from cookies
  const getAuthToken = useCallback(() => {
    return document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('accessToken='))
      ?.split('=')[1];
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = async () => {
      if (!activeConversation?.roomName || !currentUser) return;

      const token = getAuthToken();

      if (!token) {
        setError('Authentication token not found');
        return;
      }

      try {
        console.log(`Connecting to room: ${activeConversation.roomName}`);
        // Using singleton service - don't need to create new one, just switch rooms
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
          queryClient.setQueryData(
            ['conversations'],
            (oldData: Conversation[] | undefined) =>
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
    };
  }, [
    activeConversation?.roomName,
    activeConversation?.id,
    wsService,
    queryClient,
    addNewMessage,
    currentUser,
    getAuthToken
  ]);

  const selectConversation = useCallback(
    async (conversation: Conversation) => {
      try {
        setError(null);
        setActiveConversation(conversation);
      } catch (err) {
        console.error('Error switching conversation:', err);
        setError('Failed to switch conversation');
      }
    },
    []
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeConversation || !currentUser) {
        setError('No active conversation or user not logged in');
        return;
      }

      try {
        const tempMessage: Message = {
          id: Date.now(),
          message: content,
          sender: currentUser.id,
          receiver: activeConversation.id,
          sentTime: new Date(),
        };

        await wsService.sendMessage(content);
        
        addNewMessage(tempMessage);

        queryClient.setQueryData(
          ['conversations'],
          (oldData: Conversation[] | undefined) =>
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
      createRoomMutation.mutate(userId);
    },
    [createRoomMutation]
  );

  return {
    conversations,
    messages,
    selectedRoom,
    isLoadingConversations,
    isLoadingMessages,
    isCreatingRoom: createRoomMutation.isLoading,
    isSearchingUsers: searchUsersMutation.isLoading,
    handleRoomSelect,
    handleCreateRoom,
    handleSearchUsers,
    activeConversation,
    loading: isLoadingConversations,
    loadingMore: isLoadingMore,
    error,
    currentUser,
    hasMoreMessages: hasMore,
    loadMoreMessages,
    selectConversation,
    sendMessage,
    startNewConversation,
    isCreatingChat: createRoomMutation.isLoading,
    messagesEndRef,
    scrollToBottom,
  };
};