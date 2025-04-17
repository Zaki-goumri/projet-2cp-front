import React from 'react';
import { useNotifications } from './context/NotificationContext';
import { format, isToday, isYesterday, startOfWeek, endOfWeek } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Clock, Mail, CheckCircle, Users, Loader2 } from 'lucide-react';
import { Notification } from './types/notification';

// Notification type mapping to the appropriate icon
const notificationTypeIcons: Record<string, React.ComponentType<any>> = {
  message: Mail,
  application: CheckCircle,
  team: Users,
  info: Mail,
  success: CheckCircle,
  warning: Clock,
  error: Clock
};

interface GroupedNotifications {
  [key: string]: Notification[];
}

const NotificationsPage = () => {
  const { notifications, loading, markAsRead, markAllAsRead } = useNotifications();

  // Group notifications by time period
  const groupedNotifications = notifications.reduce((groups: GroupedNotifications, notification) => {
    const createdAt = new Date(notification.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Set hours, minutes, seconds and milliseconds to 0 to compare dates only
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    createdAt.setHours(0, 0, 0, 0);
    
    let group = 'Earlier This Week';
    
    if (isToday(createdAt)) {
      group = 'Today';
    } else if (isYesterday(createdAt)) {
      group = 'Yesterday';
    }
    
    if (!groups[group]) {
      groups[group] = [];
    }
    
    groups[group].push(notification);
    return groups;
  }, {});

  // Create time period sections
  const timePeriods = ['Today', 'Yesterday', 'Earlier This Week'];

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
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
        {notifications.some(n => !n.read) && (
          <Button 
            onClick={markAllAsRead}
            variant="outline"
          >
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center p-10">
          <p className="text-gray-500">You don't have any notifications yet.</p>
        </div>
      ) : (
        <>
          {timePeriods.map((period) => {
            const periodNotifications = groupedNotifications[period] || [];
            
            if (periodNotifications.length === 0) {
              return null;
            }
            
            return (
              <div key={period} className="mb-6">
                <h2 className="mb-4 text-lg font-medium text-gray-700">{period}</h2>
                <div className="space-y-3">
                  {periodNotifications.map((notification) => {
                    const IconComponent = notificationTypeIcons[notification.type] || Mail;
                    const date = new Date(notification.createdAt);
                    const formattedTime = format(date, 'h:mm a');
                    
                    return (
                      <div 
                        key={notification.id} 
                        className={`p-4 my-2 rounded-lg ${
                          !notification.read ? 'bg-blue-50' : 'bg-white'
                        } border`}
                        onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold">{notification.title}</h4>
                            <p className="text-gray-600">{notification.message}</p>
                          </div>
                          <span className="text-sm text-gray-500">{formattedTime}</span>
                        </div>
                        {!notification.read && (
                          <div className="mt-2 flex justify-end">
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default NotificationsPage; 