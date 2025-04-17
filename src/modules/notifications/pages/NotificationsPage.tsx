import React, { useMemo } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { format, isToday, isYesterday, startOfWeek, endOfWeek } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, FileText, Users, MoreVertical } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { notifications, loading, markAsRead, markAllAsRead } = useNotifications();

  const groupedNotifications = useMemo(() => {
    const today: any[] = [];
    const yesterday: any[] = [];
    const thisWeek: any[] = [];
    const earlier: any[] = [];
    
    notifications.forEach(notification => {
      const notificationDate = new Date(notification.createdAt);
      
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

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

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

  const renderNotification = (notification: any) => {
    const type = notification.type || 'message';
    const formattedTimeAgo = notification.timeAgo || '7 minutes ago';
    const isUnread = !notification.read;
    
    return (
      <div
        key={notification.id}
        className={`flex items-start py-3 px-2 ${isUnread ? 'bg-green-50 rounded-lg' : ''}`}
        onClick={() => isUnread && handleMarkAsRead(notification.id)}
      >
        <div className="w-[40px] h-[40px] bg-green-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
          {getNotificationIcon(type)}
        </div>
        
        <div className="flex-grow">
          <div className="text-base font-semibold">{notification.title}</div>
          <div className="flex items-center text-gray-500 text-sm">
            <span>{formattedTimeAgo}</span>
            <span className="mx-1">•</span>
            <span>{notification.message}</span>
          </div>
        </div>
        
        <button className="text-gray-400 hover:text-gray-600 p-1 self-start flex-shrink-0">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    );
  };

  const renderSection = (title: string, notificationList: any[]) => {
    if (notificationList.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-900 mb-2">{title}</h3>
        <div className="space-y-1">
          {notificationList.map(renderNotification)}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button 
          onClick={handleMarkAllAsRead} 
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-4 py-1 h-auto font-normal"
          variant="ghost"
        >
          Disable
        </Button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center p-10">
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