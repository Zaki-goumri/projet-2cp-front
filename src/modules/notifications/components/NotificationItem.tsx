import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Bell, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { Notification, NotificationType } from '../types/notification';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  const { id, title, message, type, read, createdAt } = notification;
  
  const getTypeColor = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-500';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-500';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-500';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-500';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-500';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'info':
        return <Bell className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = () => {
    switch (type) {
      case 'info':
        return 'secondary';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'destructive';
      default:
        return 'secondary';
    }
  };
  
  return (
    <div
      className={`p-4 my-2 rounded-lg border ${
        !read ? 'bg-blue-50' : 'bg-white'
      } border-l-4 ${getTypeColor()} shadow-sm flex items-start`}
    >
      <Avatar 
        className={`mr-3 h-9 w-9 ${!read ? 'bg-blue-100' : 'bg-gray-100'}`}
      >
        {getTypeIcon()}
      </Avatar>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-semibold mb-1">{title}</h4>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="mr-1 h-3 w-3" />
            <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{message}</p>
        
        <div className="flex items-center justify-between">
          <Badge variant={getBadgeVariant() as any} className="capitalize">
            {type}
          </Badge>
          
          {!read && (
            <Button 
              size="sm"
              variant="ghost"
              onClick={onMarkAsRead}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 h-auto"
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