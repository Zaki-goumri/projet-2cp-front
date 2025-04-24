import React from 'react';
import { useNotifications } from '@/modules/notifications/hooks/useNotifications';
import { format, isToday, isYesterday } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Clock, Mail, CheckCircle, Users, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { Notification } from '@/modules/notifications/types/notification';

// Notification type mapping to the appropriate icon
const notificationTypeIcons: Record<string, React.ComponentType<any>> = {
  message: Mail,
  application: CheckCircle,
  team: Users,
  info: Mail,
  success: CheckCircle,
  warning: Clock,
  error: Clock,
  default: Mail
};

interface GroupedNotifications {
  [key: string]: Notification[];
}

const NotificationsPage = () => {
  const {
    data,
    isLoading,
    error,
    markAllAsRead,
    isMarkingAllRead,
    deleteNotification,
  } = useNotifications();

  const notifications = data?.notifications || [];

  const groupedNotifications = notifications.reduce((groups: GroupedNotifications, notification: Notification) => {
    const createdAt = new Date(notification.created_at);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    
    let group = 'Earlier';
    
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

  // Order the time periods
  const timePeriods = Object.keys(groupedNotifications).sort((a, b) => {
    if (a === 'Today') return -1;
    if (b === 'Today') return 1;
    if (a === 'Yesterday') return -1;
    if (b === 'Yesterday') return 1;
    return 0;
  });

  const handleMarkAllRead = () => {
    markAllAsRead(); // Call the mutation function
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering click on the row
    deleteNotification(id); // Call the mutation function
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-3xl text-center text-red-600">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        <p>Error loading notifications: {error.message}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {/* Show button only if there are unread notifications */}
        {notifications.some(n => !n.read) && (
          <Button
            onClick={handleMarkAllRead}
            variant="outline"
            size="sm"
            disabled={isMarkingAllRead} // Disable while mutation is pending
          >
            {isMarkingAllRead ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center p-10 border rounded-lg bg-gray-50">
          <Mail className="h-12 w-12 mx-auto mb-4 text-gray-400" />
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
                <h2 className="mb-4 text-lg font-semibold text-gray-800 capitalize">{period}</h2>
                <div className="space-y-3">
                  {periodNotifications.map((notification: Notification) => {
                    const IconComponent = notificationTypeIcons['default'];
                    const date = new Date(notification.created_at);
                    const formattedTime = format(date, 'h:mm a');
                    
                    return (
                      <div
                        key={notification.id}
                        className={`relative group p-4 rounded-lg border transition-colors duration-150 ${
                          !notification.read ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                        // Note: Click-to-mark-read for individual items is not implemented via API yet
                        // onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                      >
                        {/* Unread indicator dot */}
                        {!notification.read && (
                          <div className="absolute top-3 right-3 h-2.5 w-2.5 bg-blue-500 rounded-full"></div>
                        )}
                        {/* Delete Button (appears on hover) */}
                        <button
                          onClick={(e) => handleDelete(notification.id, e)}
                          className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-red-500"
                          aria-label="Delete notification"
                          // disabled={isDeletingNotification} // Add per-item loading later if needed
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        <div className="flex items-start space-x-3 mr-6"> {/* Added mr-6 for delete button space */} 
                          <IconComponent className={`h-5 w-5 mt-1 ${!notification.read ? 'text-blue-600' : 'text-gray-500'}`} />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{formattedTime}</span>
                        </div>
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