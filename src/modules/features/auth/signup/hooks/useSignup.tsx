
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { registerUser } from "../services/signup";
import { User, RegisterRequest } from "../types/signup";
import { useUserStore } from "@/modules/shared/store/userStore";
import { useNavigate } from "react-router";

const useSignup = () => {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: RegisterRequest) => registerUser(values),
    onSuccess: (data: User) => {
      setUser({ ...data });
      navigate("/");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response) {
        console.log((error.response.data as { error?: string }).error);
      } else {
        console.error("Unknown error");
      }
    },
  });
};

export default useSignup;
