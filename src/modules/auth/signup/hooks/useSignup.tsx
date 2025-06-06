import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { signupService } from '../services/signup.service';
import { RegisterRequest } from '../types/signup.types';
import { useUserStore } from '@/modules/shared/store/userStore';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Student, Company } from '@/modules/shared/types/shared.types';
import { requestFcmToken } from '@/api/firebase.messaging';
const useSignup = () => {
  const setUser = useUserStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: RegisterRequest) => signupService.register(values),
    onSuccess: (data: Student | Company) => {
      setUser({ ...data });
      requestFcmToken();
      navigate('/home');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (typeof errorData === 'object' && errorData !== null) {
          const errorMessages = Object.entries(errorData)
            .map(([, value]) => {
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
