import React from 'react';
import { Bell, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Notification } from './types';

type NotificationBellProps = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => void;
};

export const NotificationBell = ({ 
  notifications, 
  unreadCount, 
  markAsRead, 
  markAllAsRead 
}: NotificationBellProps) => (
  <div className="relative">
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="relative">
          <Bell className="h-10 w-10 cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-gray-100" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="!sm:max-w-sm !w-80 !max-w-[calc(100vw-2rem)] !border-gray-100 !bg-white !p-2"
      >
        <DropdownMenuLabel className="!px-2 !text-lg !font-semibold !text-black">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="!bg-gray-200" />
        <div className="!max-h-[300px] !overflow-auto">
          {notifications.length > 0 ? (
            notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="!flex !cursor-pointer !flex-col !items-start !gap-1 !rounded-lg !p-3 hover:!bg-gray-100"
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="!flex !w-full !items-start !justify-between">
                  <span className="!flex !items-center !gap-2 !font-medium !text-black">
                    {!notification.read && (
                      <span className="!h-2 !w-2 !rounded-full !bg-blue-500" />
                    )}
                    {notification.title}
                  </span>
                  <span className="!flex !items-center !gap-1 !text-xs !text-gray-500">
                    <Clock className="!h-3 !w-3" />
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="!text-sm !text-black">
                  {notification.message}
                </p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications at this time
            </div>
          )}
        </div>
        <DropdownMenuSeparator className="!bg-gray-200" />
        <Link to="/notifications" className="block w-full">
          <DropdownMenuItem className="!flex !items-center !justify-center !gap-2 !rounded-lg p-2 !text-blue-600 hover:!bg-blue-50 hover:!text-blue-700">
            View all notifications
          </DropdownMenuItem>
        </Link>
        {unreadCount > 0 && (
          <DropdownMenuItem 
            className="!flex !items-center !justify-center !gap-2 !rounded-lg p-2 !text-blue-600 hover:!bg-blue-50 hover:!text-blue-700"
            onClick={() => markAllAsRead()}
          >
            Mark all as read
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default NotificationBell; 