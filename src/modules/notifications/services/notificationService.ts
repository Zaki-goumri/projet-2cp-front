import { Notification } from '../types/notification';
import api from '@/api/axios.config';
import { NotificationsResponse } from '../types/notification';

const NOTIFICATIONS_ENDPOINT = '/Auth/notfi';
const SINGLE_NOTIFICATION_ENDPOINT = '/Auth/notif';

/**
 * Fetches all notifications for the authenticated user.
 */
export const getNotifications = async (): Promise<NotificationsResponse> => {
  try {
    const response = await api.get<Notification[]>(NOTIFICATIONS_ENDPOINT);
    return { notifications: response.data };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

/**
 * Marks all notifications as read for the authenticated user.
 */
export const markAllNotificationsAsRead = async (): Promise<void> => {
  try {
    await api.put(NOTIFICATIONS_ENDPOINT);
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

/**
 * Deletes a specific notification by its ID.
 */
export const deleteNotification = async (id: number): Promise<void> => {
  try {
    await api.delete(`${SINGLE_NOTIFICATION_ENDPOINT}/${id}/`);
  } catch (error) {
    console.error(`Error deleting notification with ID ${id}:`, error);
    throw error;
  }
};

export const notificationService = {
  getNotifications: async (): Promise<NotificationsResponse[]> => {
    const response = await api.get<NotificationsResponse[]>(
      NOTIFICATIONS_ENDPOINT
    );
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    const response = await api.post(`${NOTIFICATIONS_ENDPOINT}/${id}/read`);
    return response.data;
  },
};
