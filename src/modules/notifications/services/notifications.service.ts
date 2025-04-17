import axios from '@/api/axios.config';
import { Notification, NotificationsResponse, MarkAsReadResponse } from '../types/notifications.types';

// API endpoints
const API_ENDPOINTS = {
  NOTIFICATIONS: '/api/notifications',
  MARK_AS_READ: '/api/notifications/read',
};

// Mock data for development
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New message from Yassir',
    description: 'Hi there! We have received your application and...',
    type: 'message',
    unread: true,
    createdAt: new Date().toISOString(),
    sender: {
      id: '1',
      name: 'Yassir',
    }
  },
  {
    id: '2',
    title: 'Application status update',
    description: 'Your application for the Software Developer role has changed from Applied to Interview',
    type: 'application',
    unread: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Team invitation',
    description: 'You have been invited to join "The Hackers" team.',
    type: 'team',
    unread: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'New message from Huawei',
    description: 'Hi there! We have received your application and...',
    type: 'message',
    unread: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    sender: {
      id: '2',
      name: 'Huawei',
    }
  },
  {
    id: '5',
    title: 'Application status update',
    description: 'Your application for the Data Engineer role has changed from Applied to Accepted',
    type: 'application',
    unread: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
  },
  {
    id: '6',
    title: 'Team invitation',
    description: 'You have been invited to join "Beta Alpha" team.',
    type: 'team',
    unread: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
  },
  {
    id: '7',
    title: 'New message from IBM',
    description: 'Hi there! We have received your application and...',
    type: 'message',
    unread: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    sender: {
      id: '3',
      name: 'IBM',
    }
  },
  {
    id: '8',
    title: 'Application status update',
    description: 'Your application for the Front-end Developer role has changed from Interview to Accepted',
    type: 'application',
    unread: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: '9',
    title: 'Team invitation',
    description: 'You have been invited to join "The Wizards" team.',
    type: 'team',
    unread: false,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
  },
];

// Service functions
export const fetchNotifications = async (): Promise<NotificationsResponse> => {
  try {
    // For development, return mock data
    // In production, uncomment the API call below
    // const response = await axios.get(API_ENDPOINTS.NOTIFICATIONS);
    // return response.data;
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const unreadCount = mockNotifications.filter(n => n.unread).length;
    
    return {
      notifications: mockNotifications,
      unreadCount
    };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationsAsRead = async (notificationIds?: string[]): Promise<MarkAsReadResponse> => {
  try {
    // For development, update mock data
    // In production, uncomment the API call below
    // const response = await axios.post(API_ENDPOINTS.MARK_AS_READ, { notificationIds });
    // return response.data;
    
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update mock data
    mockNotifications.forEach(notification => {
      if (!notificationIds || notificationIds.includes(notification.id)) {
        notification.unread = false;
      }
    });
    
    const unreadCount = mockNotifications.filter(n => n.unread).length;
    
    return {
      success: true,
      unreadCount
    };
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    throw error;
  }
}; 