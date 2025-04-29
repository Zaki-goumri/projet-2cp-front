import { useState, useEffect, useCallback } from 'react';
import { Message, Conversation } from '../types';
import { chatService } from '../services/chat.service';
import { WebSocketService } from '../services/websocket.service';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]| null>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [wsService] = useState(() => new WebSocketService());
  const [currentUser, setCurrentUser] = useState<{
    id: number;
    name: string;
    type: string;
  } | null>(null);

  // Load current user info
  useEffect(() => {
    const userInfo = localStorage.getItem('user-storage');
    if (userInfo) {
      try {
        const userData = JSON.parse(userInfo);
        if (userData && userData.id) {
          setCurrentUser({
            id: userData.id,
            name: userData.name || userData.username || '',
            type: userData.type || (userData.is_company ? 'Company' : 'Student'),
          });
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
        setError('Failed to load user data');
      }
    }
  }, []);

  useEffect(() => {
    const loadConversations = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await chatService.getConversations();
        const parsedConversations = chatService.parseConversationList(data, currentUser);
        
        if (parsedConversations) {
          setConversations(parsedConversations);
          if (parsedConversations.length > 0 && !activeConversation) {
            setActiveConversation(parsedConversations[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load conversations:', err);
        setError('Failed to load conversations');
        setConversations(null);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [currentUser, activeConversation]);

  // Create a new conversation if needed
  const startNewConversation = useCallback(async (userId: number) => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await chatService.createRoom(userId);
      if (response && response.room_name) {
        // Format the new conversation
        // const newConversation: Conversation = {
        //   id: userId,
        //   name: response.name || 'New Conversation',
        //   avatar: response.profilepic || undefined,
        //   roomName: response.room_name,
        //   userType: response.type || 'User',
        //   email: response.email || '',
        // };

        // setConversations((prev) => {
        //   if (!prev.some((conv) => conv.id === userId)) {
        //     return [...prev, newConversation];
        //   }
        //   return prev;
        // });

        // Set as active conversation
        // setActiveConversation(newConversation);
      }
    } catch (err) {
      setError('Failed to create conversation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

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

    const cleanup = wsService.onMessage((message: Message) => {
      const isCurrentUserMessage = currentUser
        ? message.sender === currentUser.id
        : false;

      const newMessage: Omit<Message, 'id'> = {
        message: message.message,
        sender: message.sender,
        receiver: activeConversation.id,
        sentTime: new Date(message.sentTime || Date.now()),
      };

      if (message.message) {
        // setConversations((prev) =>
        //   prev.map((conv) =>
        //     conv.id === activeConversation.id
        //       ? {
        //           ...conv,
        //           lastMessage: message.message,
        //           lastMessageTime: new Date(),
        //         }
        //       : conv
        //   )
        // );
      }
    });

    return () => {
      cleanup();
      wsService.disconnect();
    };
  }, [activeConversation?.roomName, wsService, currentUser]);

  const selectConversation = useCallback((conversation: Conversation) => {
    setActiveConversation(conversation);
    setMessages([]);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeConversation || !wsService.isConnected() || !currentUser)
        return;

      try {
        wsService.sendMessage(content);

        const messageId = Date.now().toString();
        const newMessage: Omit<Message, 'id'> = {
          message: content,
          sender: currentUser.id,
          receiver: activeConversation.id,
          sentTime: new Date(),
        };


        // Update last message in conversation list
        // setConversations((prev) =>
        //   prev.map((conv) =>
        //     conv.id === activeConversation.id
        //       ? {
        //           ...conv,
        //           lastMessage: content,
        //           lastMessageTime: new Date(),
        //         }
        //       : conv
        //   )
        // );
      } catch (err) {
        setError('Failed to send message');
        console.error(err);
      }
    },
    [activeConversation, wsService, currentUser]
  );

  return {
    messages,
    conversations,
    activeConversation,
    loading,
    error,
    currentUser,
    selectConversation,
    sendMessage,
    startNewConversation,
  };
};
