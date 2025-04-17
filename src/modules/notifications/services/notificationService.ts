import { Notification } from '../types/notification';

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome to the platform!',
    message: 'We are excited to have you here. Start exploring!',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'New feature available',
    message: 'Check out our latest updates and improvements',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
  {
    id: '3',
    title: 'System maintenance',
    message: 'Scheduled maintenance will occur tomorrow at 2 AM',
    type: 'warning',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '4',
    title: 'Security alert',
    message: 'Please update your password for security reasons',
    type: 'error',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
];

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNotifications;
  },

  markAsRead: async (id: string): Promise<void> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  },

  markAllAsRead: async (): Promise<void> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    mockNotifications.forEach(notification => {
      notification.read = true;
    });
  },

  getUnreadCount: async (): Promise<number> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockNotifications.filter(n => !n.read).length;
  },
};