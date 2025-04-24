import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  CheckCircle,
  Bell,
  Clock,
  MessageCircle,
  UserPlus,
} from 'lucide-react';
import { Notification } from '../types/notification';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const { title, message, type, read, created_at } = notification;

  const getTypeColor = () => {
    switch (type) {
      case 'message':
        return 'bg-blue-100 text-blue-800 border-blue-500';
      case 'invitation':
        return 'bg-green-100 text-green-800 border-green-500';
      case 'other':
        return 'bg-gray-100 text-gray-800 border-gray-500';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-500';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-4 w-4" />;
      case 'invitation':
        return <UserPlus className="h-4 w-4" />;
      case 'other':
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = () => {
    switch (type) {
      case 'message':
        return 'secondary';
      case 'invitation':
        return 'success';
      case 'other':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div
      className={`my-2 rounded-lg border p-4 ${
        !read ? 'bg-blue-50' : 'bg-white'
      } border-l-4 ${getTypeColor()} flex items-start shadow-sm`}
    >
      <Avatar
        className={`mr-3 h-9 w-9 ${!read ? 'bg-blue-100' : 'bg-gray-100'}`}
      >
        {getTypeIcon()}
      </Avatar>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h4 className="mb-1 text-sm font-semibold">{title}</h4>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="mr-1 h-3 w-3" />
            <span>
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>
        </div>

        <p className="mb-2 text-sm text-gray-600">{message}</p>

        <div className="flex items-center justify-between">
          <Badge variant={getBadgeVariant() as any} className="capitalize">
            {type}
          </Badge>

          {!read && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onMarkAsRead}
              className="h-auto p-1 text-blue-600 hover:bg-blue-50 hover:text-blue-800"
            >
              <CheckCircle className="h-4 w-4" />
              <span className="ml-1 text-xs">Mark as read</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;

