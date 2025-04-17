import { Message, Conversation } from '../types';

// Mock data for development
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Huawei',
    avatar: '/huawei-logo.png',
    lastMessage: 'Hello sir, you have been accepted in our last internship, but we need more informations in your cv.',
    lastMessageTime: new Date('2023-07-10T12:24:00'),
    unreadCount: 1,
    isOnline: true,
    email: 'HuaweiOfficial@gmail.com',
    phoneNumber: '+2135678910'
  },
  {
    id: '2',
    name: 'Yassir',
    avatar: '/yassir-logo.png',
    lastMessage: 'Hello your team been accepted...',
    lastMessageTime: new Date('2023-07-10T12:17:00'),
    unreadCount: 0,
    isOnline: false
  },
  {
    id: '3',
    name: 'Aita Jibril',
    avatar: '/aita-avatar.png',
    lastMessage: 'These are the informations needed...',
    lastMessageTime: new Date('2023-07-10T11:01:00'),
    unreadCount: 0,
    isOnline: false
  }
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      content: 'Hello sir, you have been accepted in our last internship, but we need more informations in your cv.',
      senderId: '1',
      receiverId: 'current-user-id',
      timestamp: new Date('2023-07-10T12:24:00'),
      isRead: true
    },
    {
      id: '102',
      content: 'That\'s such a good news ! of course what informations do you need ?',
      senderId: 'current-user-id',
      receiverId: '1',
      timestamp: new Date('2023-07-10T12:25:00'),
      isRead: true
    },
    {
      id: '103',
      content: 'For now:',
      senderId: '1',
      receiverId: 'current-user-id',
      timestamp: new Date('2023-07-10T12:26:00'),
      isRead: true
    },
    {
      id: '104',
      content: 'We need your full name, age, education school...',
      senderId: '1',
      receiverId: 'current-user-id',
      timestamp: new Date('2023-07-10T12:26:30'),
      isRead: true
    },
    {
      id: '105',
      content: 'Okay I\'ll send it to you',
      senderId: 'current-user-id',
      receiverId: '1',
      timestamp: new Date('2023-07-10T12:27:00'),
      isRead: true
    },
    {
      id: '106',
      content: 'Bentaieb Mohammed',
      senderId: 'current-user-id',
      receiverId: '1',
      timestamp: new Date('2023-07-10T12:27:30'),
      isRead: true
    },
    {
      id: '107',
      content: '23 years old, student at ESI Sidi Bel Abbès',
      senderId: 'current-user-id',
      receiverId: '1',
      timestamp: new Date('2023-07-10T12:28:00'),
      isRead: true
    },
    {
      id: '108',
      content: 'Thank sir we need six:',
      senderId: '1',
      receiverId: 'current-user-id',
      timestamp: new Date('2023-07-10T12:29:00'),
      isRead: true
    },
    {
      id: '109',
      content: 'have a good day',
      senderId: '1',
      receiverId: 'current-user-id',
      timestamp: new Date('2023-07-10T12:30:00'),
      isRead: true
    },
    {
      id: '110',
      content: 'and thank you',
      senderId: '1',
      receiverId: 'current-user-id',
      timestamp: new Date('2023-07-10T12:30:30'),
      isRead: true
    }
  ],
  '2': [
    {
      id: '201',
      content: 'Hello your team been accepted...',
      senderId: '2',
      receiverId: 'current-user-id',
      timestamp: new Date('2023-07-10T12:17:00'),
      isRead: true
    }
  ],
  '3': [
    {
      id: '301',
      content: 'These are the informations needed...',
      senderId: '3',
      receiverId: 'current-user-id',
      timestamp: new Date('2023-07-10T11:01:00'),
      isRead: true
    }
  ]
};

// API Functions with mock implementation
export const fetchConversations = async (): Promise<Conversation[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CONVERSATIONS);
    }, 500);
  });
};

export const fetchMessages = async (conversationId: string): Promise<Message[]> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const messages = MOCK_MESSAGES[conversationId];
      if (messages) {
        resolve(messages);
      } else {
        reject(new Error('Conversation not found'));
      }
    }, 500);
  });
};

export const sendMessageApi = async (message: Omit<Message, 'id'>): Promise<Message> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: Message = {
        ...message,
        id: Math.random().toString(36).substring(2, 9)
      };
      
      // In a real app, you would save the message to the backend here
      
      resolve(newMessage);
    }, 300);
  });
};

// Later, you can replace these mock implementations with actual API calls 