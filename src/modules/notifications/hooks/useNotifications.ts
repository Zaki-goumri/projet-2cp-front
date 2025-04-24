import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getNotifications,
  markAllNotificationsAsRead,
  deleteNotification,
} from '../services/notificationService';
import { NotificationsResponse, Notification } from '../types/notification';

const NOTIFICATIONS_QUERY_KEY = ['notifications'];

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const queryResult = useQuery<NotificationsResponse, Error>({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: getNotifications,
  });

  const markAllReadMutation = useMutation<void, Error, void>({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });

  const deleteNotificationMutation = useMutation<void, Error, number>({
    mutationFn: deleteNotification,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });

    },
  
  });

  return {
    ...queryResult, 
    markAllAsRead: markAllReadMutation.mutate, 
    isMarkingAllRead: markAllReadMutation.isLoading,
    deleteNotification: deleteNotificationMutation.mutate, 
     isDeletingNotification: deleteNotificationMutation.isLoading,
  };
}; 