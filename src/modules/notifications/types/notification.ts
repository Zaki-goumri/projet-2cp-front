export type NotificationType = 'message' | 'invitation' | 'other';

export interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string; 
  read: boolean;
  type: NotificationType;
}

export interface NotificationsResponse {
  notifications: Notification[];
} 