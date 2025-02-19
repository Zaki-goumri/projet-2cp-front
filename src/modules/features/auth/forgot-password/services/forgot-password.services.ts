
import axios from "@/api/axios.config"
import { Axios, isAxiosError } from "axios"
  const api:Axios=axios;

 export async function forgotPassword({email}:ResetEmailDtoReq):Promise<ResetEmailDtoRes>{
    try {
    
      const response = await api.post<ResetEmailDtoRes>("/Auth/otpemail",{email});
      return response.data;
    } catch (error:unknown) {
      if (isAxiosError(error)){
         if (error.response?.status==404){
          return Promise.reject(new Error("User Doesn't Exist"));
      }
      if (error.response?.status==500){
        return Promise.reject(new Error("Server Error"));
    }
      return Promise.reject(new Error("Unknown Error"));
    }
    return Promise.reject(new Error("Unknown Error"));
  }}

export async function resetPassword({email,otp,expectedDto,password}:ResetPasswordReq):Promise<ResetPasswordResDto>{
   try {
    //TODO: check the issueTime Later
    const otpValid=otp!=expectedDto
     if (otpValid){
      return Promise.reject(new Error("Invalid OTP"));
    }
     const response = await api.put<ResetPasswordResDto>("/Auth/userpassword",{email,password});
     return response.data;
   } catch (error) {
    if (isAxiosError(error)){
      if (error.response?.status==404){
       return Promise.reject(new Error("No user With this email Found"));
    
   }
      return Promise.reject(new Error("Unknown Error"));
}
return Promise.reject(new Error("Unknown Error"));
  }}
  


