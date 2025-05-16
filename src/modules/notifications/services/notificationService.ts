import { Notification } from '../types/notification';
import axios from '@/api/axios.config';
import { NotificationsResponse } from '../types/notification';

export class NotificationService {
  private static instance: NotificationService | null = null;
  private endpoints = {
    notifications: '/notifications/',
    authNotifications: '/Auth/notfi',
    singleNotification: '/Auth/notif'
  };

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Fetches all notifications for the authenticated user.
   */
  public async getNotifications(): Promise<NotificationsResponse> {
    try {
      const response = await axios.get<Notification[]>(this.endpoints.authNotifications);
      return { notifications: response.data };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  /**
   * Fetches notifications from the notifications endpoint.
   */
  public async getAllNotifications(): Promise<NotificationsResponse[]> {
    try {
      const response = await axios.get<NotificationsResponse[]>(this.endpoints.notifications);
      return response.data;
    } catch (error) {
      console.error('Error fetching all notifications:', error);
      throw error;
    }
  }

  /**
   * Marks all notifications as read for the authenticated user.
   */
  public async markAllNotificationsAsRead(): Promise<void> {
    try {
      await axios.put(this.endpoints.authNotifications);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  /**
   * Marks a specific notification as read by its ID.
   */
  public async markAsRead(id: string): Promise<void> {
    try {
      const response = await axios.post(`${this.endpoints.notifications}${id}/read`);
      return response.data;
    } catch (error) {
      console.error(`Error marking notification with ID ${id} as read:`, error);
      throw error;
    }
  }

  /**
   * Deletes a specific notification by its ID.
   */
  public async deleteNotification(id: number): Promise<void> {
    try {
      await axios.delete(`${this.endpoints.singleNotification}/${id}/`);
    } catch (error) {
      console.error(`Error deleting notification with ID ${id}:`, error);
      throw error;
    }
  }
}

export const notificationService = NotificationService.getInstance();
