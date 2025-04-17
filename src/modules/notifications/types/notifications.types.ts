export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'message' | 'application' | 'team';
  unread: boolean;
  createdAt: string;
  relatedId?: string; // ID of related entity (message, application, team)
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

export interface MarkAsReadRequest {
  notificationIds?: string[]; // If empty, marks all as read
}

export interface MarkAsReadResponse {
  success: boolean;
  unreadCount: number;
} 