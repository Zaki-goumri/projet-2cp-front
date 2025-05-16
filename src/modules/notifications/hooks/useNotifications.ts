import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../services/notificationService';
import { NotificationsResponse, Notification } from '../types/notification';

const NOTIFICATIONS_QUERY_KEY = ['notifications'];

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const queryResult = useQuery<NotificationsResponse, Error>({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: () => notificationService.getNotifications(),
  });

  const markAllReadMutation = useMutation<void, Error, void>({
    mutationFn: () => notificationService.markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });

  const deleteNotificationMutation = useMutation<void, Error, number>({
    mutationFn: (id) => notificationService.deleteNotification(id),
    onSuccess: () => {
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

