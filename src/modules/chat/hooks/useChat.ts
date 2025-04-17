import { useState, useEffect } from 'react';
import { Message, Conversation } from '../types';
import { fetchConversations, fetchMessages, sendMessageApi } from '../services/chatService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
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
        isRead: false
      };
      
      const sentMessage = await sendMessageApi(newMessage);
      setMessages(prev => [...prev, sentMessage]);
      
      // Update last message in conversation list
      setConversations(prev => 
        prev.map(conv => 
          conv.id === activeConversation.id 
            ? { 
                ...conv, 
                lastMessage: content,
                lastMessageTime: new Date() 
              } 
            : conv
        )
      );
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  return {
    messages,
    conversations,
    activeConversation,
    loading,
    error,
    selectConversation,
    sendMessage
  };
}; 