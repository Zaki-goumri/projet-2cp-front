import { useState, useEffect } from 'react';
import { Message, Conversation } from '../types';
import {
  fetchConversations,
  fetchMessages,
  sendMessageApi,
  fetchUserById,
} from '../services/chatService';

interface ChatState {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load conversations on mount
  useEffect(() => {
    const loadConversations = async () => {
      setLoading(true);
      try {
        const data = await fetchConversations();
        setConversations(data);
        if (data.length > 0) {
          setActiveConversation(data[0]);
        }
      } catch (err) {
        setError('Failed to load conversations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    if (!activeConversation) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const data = await fetchMessages(activeConversation.id);
        setMessages(data);
      } catch (err) {
        setError('Failed to load messages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [activeConversation]);

  // Select a conversation
  const selectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
  };

  // Send a message
  const sendMessage = async (content: string) => {
    if (!activeConversation) return;

    try {
      const newMessage: Omit<Message, 'id'> = {
        content,
        senderId: 'current-user-id', // Replace with actual user ID
        receiverId: activeConversation.id,
        timestamp: new Date(),
        isRead: false,
      };

      const sentMessage = await sendMessageApi(newMessage);
      setMessages((prev) => [...prev, sentMessage]);

      // Update last message in conversation list
      setConversations((prev) =>
        prev.map((conv) =>
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
  };

  // Start a new conversation with a user by ID
  const startNewConversation = async (userId: string) => {
    try {
      setLoading(true);
      // Fetch user details to create a new conversation
      const userData = (await fetchUserById(userId)) as ChatState;

      if (!userData) {
        throw new Error('User not found');
      }

      // Create a new conversation object
      const newConversation: Conversation = {
        id: userData.id,
        name: userData.name || 'Organizer',
        avatar: userData.avatar,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        lastMessageTime: new Date(),
        unreadCount: 0,
        isOnline: false,
      };

      // Add to conversations list
      setConversations((prev) => [newConversation, ...prev]);

      // Set as active conversation
      setActiveConversation(newConversation);

      // Initialize with empty messages for this conversation
      setMessages([]);
    } catch (err) {
      setError('Failed to start conversation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    conversations,
    activeConversation,
    loading,
    error,
    selectConversation,
    sendMessage,
    startNewConversation,
  };
};
