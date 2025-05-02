import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { opportunityService } from '../services/opportunity.service';
import { toast } from 'react-toastify';

export const useSavePost = () => {
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const savePostMutation = useMutation({
    mutationFn: (postId: number) => opportunityService.savePost(postId),
    onSuccess: () => {
      toast.success('Post saved successfully');
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
    onError: (error) => {
      toast.error('Failed to save post');
      console.error('Error saving post:', error);
    },
  });

  const handleSavePost = async (postId: number) => {
    try {
      setIsSaving(true);
      await savePostMutation.mutateAsync(postId);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    handleSavePost,
    isSaving,
  };
}; 