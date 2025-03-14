import CtaButton from "@/modules/shared/components/CtaButton";
import { Link } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import React, { lazy } from "react";

const ForgotPasswordForm=lazy(()=>import("@/modules/features/auth/forgot-password/components/forgotPasswordForm"));
const queryClient = new QueryClient();

const ForgotPassword = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col justify-around ">
        <ToastContainer />
          <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#98E9AB]/30 to-[#98E9AB]/50">
          <div className="bg-white p-8 rounded-xl shadow-lg mx-4 w-full max-w-md flex justify-evenly gap-10 items-center flex-col">
            <img src="/assets/logo.svg" alt="Logo" className="h-8" />
            <div className="flex flex-col gap-2 justify-center items-center">
              <h1 className="text-3xl font-bold ">
              Forgot Password
            </h1>
              <div className="text-center text-lg text-gray-500">
                Type Your Email Address To change the password
              </div>
            </div>            <ForgotPasswordForm/>

          </div>
     </div>

              </main>
    </QueryClientProvider>
  );
};
export default ForgotPassword;
