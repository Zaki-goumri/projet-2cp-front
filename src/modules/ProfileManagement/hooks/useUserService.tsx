import { User } from "@/modules/shared/store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUserById, updateUser, UpdateUserData } from "../services/userService";
import { useUserStore } from "@/modules/shared/store/userStore";
import { toast } from "react-toastify";

export function useUserInfo(id: string) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id)
  });
  return { isLoading, isError, data };
}

export function useUpdateUser(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const { user, login } = useUserStore();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      // Update the global user state
      login(updatedUser);
      
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user', user?.id] });
      
      // Show success toast
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    }
  });
}

// Hook to collect all section data for update
export function useProfileUpdate(onSuccess: () => void) {
  const { mutate: updateProfile, isLoading } = useUpdateUser(onSuccess);
  const { user } = useUserStore();

  const handleProfileUpdate = (sectionData: Partial<UpdateUserData>) => {
    if (!user) return;

    const updateData: UpdateUserData = {
      ...sectionData,
      // Include existing data if not being updated
      experience: sectionData.experience || user.experience,
      education: sectionData.education || user.education,
      description: sectionData.description || user.description,
      skills: sectionData.skills || user.skills,
    };

    updateProfile(updateData);
  };

  return {
    updateProfile: handleProfileUpdate,
    isLoading
  };
}