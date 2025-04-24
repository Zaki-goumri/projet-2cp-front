import React, { useMemo } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { isToday, isYesterday, startOfWeek, endOfWeek } from 'date-fns';
import {
  Loader2,
  MessageSquare,
  FileText,
  Users,
  MoreVertical,
} from 'lucide-react';
import { NotificationsResponse, Notification } from '../types/notification';

const NotificationsPage: React.FC = () => {
  const { 
    data: notificationsData,
    isLoading: loading, 
    markAllAsRead 
  } = useNotifications();

  const notifications = notificationsData?.notifications || [];

  const groupedNotifications = useMemo(() => {
    const today: Notification[] = [];
    const yesterday: Notification[] = [];
    const thisWeek: Notification[] = [];
    const earlier: Notification[] = [];

    notifications.forEach((notification: Notification) => {
      const notificationDate = new Date(notification.created_at);

      if (isToday(notificationDate)) {
        today.push(notification);
      } else if (isYesterday(notificationDate)) {
        yesterday.push(notification);
      } else if (
        notificationDate >= startOfWeek(new Date()) &&
        notificationDate <= endOfWeek(new Date())
      ) {
        thisWeek.push(notification);
      } else {
        earlier.push(notification);
      }
    });

    return { today, yesterday, thisWeek, earlier };
  }, [notifications]);

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'application':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'invitation':
        return <Users className="h-5 w-5 text-green-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-green-500" />;
    }
  };

  const renderNotification = (notification: Notification) => {
    const type = notification.type || 'message';
    const formattedTimeAgo = new Date(notification.created_at).toLocaleTimeString();
    const isUnread = !notification.read;

    return (
      <div
        key={notification.id}
        className={`flex items-start px-2 py-3 ${isUnread ? 'rounded-lg bg-green-50' : ''}`}
      >
        <div className="mr-3 flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-lg bg-green-50">
          {getNotificationIcon(type)}
        </div>

        <div className="flex-grow">
          <div className="text-base font-semibold">{notification.title}</div>
          <div className="flex items-center text-sm text-gray-500">
            <span>{formattedTimeAgo}</span>
            <span className="mx-1">•</span>
            <span>{notification.message}</span>
          </div>
        </div>

        <button className="flex-shrink-0 self-start p-1 text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    );
  };

  const renderSection = (title: string, notificationList: Notification[]) => {
    if (notificationList.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="mb-2 text-base font-medium text-gray-900">{title}</h3>
        <div className="space-y-1">
          {notificationList.map(renderNotification)}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-gray-500">You don't have any notifications yet.</p>
        </div>
      ) : (
        <>
          {renderSection('Today', groupedNotifications.today)}
          {renderSection('Yesterday', groupedNotifications.yesterday)}
          {renderSection('Earlier This Week', groupedNotifications.thisWeek)}
          {renderSection('Earlier', groupedNotifications.earlier)}
        </>
      )}
    </div>
  );
};

export default NotificationsPage;

