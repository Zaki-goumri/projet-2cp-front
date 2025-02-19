import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { forgotPassword, resetPassword } from "../services/forgot-password.services";
import { toast } from "react-toastify";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}
interface useSendResetEmailProps{
  onSuccess:()=>void,
}
export default function  useSendResetEmail({onSuccess}:useSendResetEmailProps){
  const [otp,setOpt]=useState<String>('') 
 const SendEmailMutation= useMutation({
  mutationFn: (values: ResetEmailDtoReq) => forgotPassword(values),
    onError: (error:unknown) => {
      if (isError(error)){
      return  toast.error(error.message);
      }
     toast.error("Unknown Error");
    },
    onSuccess:(data:ResetEmailDtoRes)=>{
      //WARNING:this is just to test since the backend is not sending the otp to the amil guelma m3a9
      console.log(data.otp);
      setOpt(data.otp);
      onSuccess();
      toast.success("Email Sent Successfully");
    }
  });
   const resetPasswordMutation=useMutation({
    mutationFn: (values: Omit<ResetPasswordReq,"expectedDto">) => resetPassword({...values,expectedDto:otp}),
    onError: (error:unknown) => {
      if (isError(error)){
       return toast.error(error.message);
      }

     toast.error("Unknown error");
    },
    onSuccess:(data:ResetPasswordResDto)=>{
      toast.success("Password Reset Successfully");
    }
  })
  return {SendEmailMutation,resetPasswordMutation}
}
