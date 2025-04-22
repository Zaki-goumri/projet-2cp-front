import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { registerUser } from '../services/signup.services';
import {  RegisterRequest } from '../types/signup.types';
import { useUserStore } from '@/modules/shared/store/userStore';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {User} from '@/modules/shared/store/userStore'

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
        const errorData = error.response.data;
        if (typeof errorData === 'object' && errorData !== null) {
          const errorMessages = Object.entries(errorData)
            .map(([key, value]) => {
              if (Array.isArray(value)) {
                return value.join(', ');
              }
              return value;
            })
            .join('\n');

          toast.error(errorMessages || 'unexpected error', {
            position: 'top-right',
            autoClose: 5000,
          });
        } else {
          toast.error(errorData || 'unexpected error', {
            position: 'top-right',
            autoClose: 5000,
          });
        }
      } else {
        toast.error('An unexpected error occurred', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    },
  });
};

export default useSignup;
