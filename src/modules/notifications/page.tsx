import React from 'react';
import { useNotifications } from '@/modules/notifications/hooks/useNotifications';
import { format, isToday, isYesterday } from 'date-fns';
import {
  Clock,
  Mail,
  CheckCircle,
  Users,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Notification } from '@/modules/notifications/types/notification';

const notificationTypeIcons: Record<string, React.ComponentType<any>> = {
  message: Mail,
  application: CheckCircle,
  team: Users,
  info: Mail,
  success: CheckCircle,
  warning: Clock,
  error: Clock,
  default: Mail,
};

interface GroupedNotifications {
  [key: string]: Notification[];
}

const NotificationsPage = () => {
  const { data, isLoading, error } = useNotifications();

  const notifications = data?.notifications || [];

  const groupedNotifications = notifications.reduce(
    (groups: GroupedNotifications, notification: Notification) => {
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
    },
    {}
  );

  const timePeriods = Object.keys(groupedNotifications).sort((a, b) => {
    if (a === 'Today') return -1;
    if (b === 'Today') return 1;
    if (a === 'Yesterday') return -1;
    if (b === 'Yesterday') return 1;
    return 0;
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-3xl p-4 text-center text-red-600">
        <AlertCircle className="mx-auto mb-2 h-8 w-8" />
        <p>Error loading notifications: {error.message}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-lg border bg-gray-50 p-10 text-center">
          <Mail className="mx-auto mb-4 h-12 w-12 text-gray-400" />
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
                <h2 className="mb-4 text-lg font-semibold text-gray-800 capitalize">
                  {period}
                </h2>
                <div className="space-y-3">
                  {periodNotifications.map((notification: Notification) => {
                    const IconComponent = notificationTypeIcons['default'];
                    const date = new Date(notification.created_at);
                    const formattedTime = format(date, 'h:mm a');

                    return (
                      <div
                        key={notification.id}
                        className={`relative rounded-lg border p-4 transition-colors duration-150 ${
                          !notification.read
                            ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        } ${!notification.read ? 'cursor-pointer' : ''}`}
                      >
                        {!notification.read && (
                          <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                        )}
                        <div className="flex items-start space-x-3">
                          <IconComponent
                            className={`mt-1 h-5 w-5 ${!notification.read ? 'text-blue-600' : 'text-gray-500'}`}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-xs whitespace-nowrap text-gray-500">
                            {formattedTime}
                          </span>
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

