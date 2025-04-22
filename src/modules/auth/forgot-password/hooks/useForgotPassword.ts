import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  forgotPassword,
  resetPassword,
} from '../services/forgot-password.services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import {ResetEmailDtoRes,ResetPasswordReq , ResetEmailDtoReq} from '../types/forget-password.dto'

function isError(error: unknown): error is Error {
  return error instanceof Error;
}
interface useSendResetEmailProps {
  onSuccess: () => void;
}
export default function useSendResetEmail({
  onSuccess,
}: useSendResetEmailProps) {
  const navigator = useNavigate();
  const [payload, setPayload] = useState<ResetEmailDtoRes>();
  const SendEmailMutation = useMutation({
    mutationFn: (values: ResetEmailDtoReq) => forgotPassword(values),
    onError: (error: unknown) => {
      if (isError(error)) {
        return toast.error(error.message);
      }
      toast.error('Unknown Error');
    },
    onSuccess: (data: ResetEmailDtoRes) => {
      //WARNING:this is just to test since the backend is not sending the otp to the email guelma m3a9
      setPayload(data);
      onSuccess();
      toast.success('Email Sent Successfully');
    },
  });
  const resetPasswordMutation = useMutation({
    mutationFn: (values: Omit<ResetPasswordReq, 'expectedDto' | 'iat'>) =>
      resetPassword({
        ...values,
        expectedDto: payload?.otp as string,
        iat: payload?.iat as string,
      }),
    onError: (error: unknown) => {
      if (isError(error)) {
        return toast.error(error.message);
      }

      toast.error('Unknown error');
    },
    onSuccess: () => {
      toast.success('Password Reset Successfully');
      setTimeout(() => {
        navigator('/');
      }, 800);
    },
  });
  return { SendEmailMutation, resetPasswordMutation };
}
