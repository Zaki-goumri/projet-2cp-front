import { User } from "@/modules/shared/store/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getUserById } from "../services/userService";

export function useUserInfo(id: string) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id)
    
  });
  return {isLoading, isError, data };
}