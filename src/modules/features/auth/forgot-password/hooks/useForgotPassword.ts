import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { forgotPassword, resetPassword } from "../services/forgot-password.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}
interface useSendResetEmailProps{
  onSuccess:()=>void,
}
export default function  useSendResetEmail({onSuccess}:useSendResetEmailProps){
  const navigator=useNavigate();
  const [otp,setOpt]=useState<ResetEmailDtoRes>() 
 const SendEmailMutation= useMutation({
  mutationFn: (values: ResetEmailDtoReq) => forgotPassword(values),
    onError: (error:unknown) => {
      if (isError(error)){
      return  toast.error(error.message);
      }
     toast.error("Unknown Error");
    },
    onSuccess:(data:ResetEmailDtoRes)=>{
      //WARNING:this is just to test since the backend is not sending the otp to the email guelma m3a9
      setOpt(data);
      onSuccess();
      toast.success("Email Sent Successfully");
     

    }
  });
   const resetPasswordMutation=useMutation({
    mutationFn: (values: Omit<ResetPasswordReq,"expectedDto">) => resetPassword({...values,expectedDto:otp!?.otp,iat:otp!?.iat}),
    onError: (error:unknown) => {
      if (isError(error)){
       return toast.error(error.message);
      }

     toast.error("Unknown error");
    },
    onSuccess:(data:ResetPasswordResDto)=>{
      toast.success("Password Reset Successfully");
       setTimeout(() => {
        navigator('/')
      }, 800);


    }
  })
  return {SendEmailMutation,resetPasswordMutation}
}
