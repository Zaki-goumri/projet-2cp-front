import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { registerUser } from '../services/signup.services';
import { User, RegisterRequest } from '../types/signup.types';
import { useUserStore } from '@/modules/shared/store/userStore';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const useSignup = () => {
  const setUser = useUserStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: RegisterRequest) => registerUser(values),
    onSuccess: (data: User) => {
      setUser({ ...data });
      navigate('/home');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.email[0], {
          position: 'top-right',
          autoClose: 5000,
        });
      } else {
        console.error('Unknown error');
      }
    },
  });
};

export default useSignup;
