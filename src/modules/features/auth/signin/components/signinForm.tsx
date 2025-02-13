"use client";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/api/axios.config";
import { setTokens } from "../services/singinServices";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Alert from "@mui/material/Alert";
import { Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {errorMessages} from "@/modules/features/auth/signin/services/singinServices";


// Local components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(50),
  password: z.string().min(1, "Password is required").max(50),
});

const SignForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  
  
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
      const response = await toast.promise(
        axios.post(`/Auth/Login`, values),
        {
          pending: 'Signing in...',
          success: {
            render({data})
            {
              setTokens(data?.data?.access, data?.data?.refresh);
              return "Signed in successfully";
            }

          },
          error: {
            render({data}: any) {
              const statusCode = data?.status;
              return errorMessages[statusCode] || "An error occured Check your network.";
            }
          }
        }
      );
  }
  // --------------------

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-5 sm:p-10 md:p-12 rounded-lg shadow-lg  h-md mx-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="E-mail"
                        {...field}
                        className=" h-12 p-7 pl-10 text-lg focus:outline-none rounded-xl opacity-50  w-full  "
                      />
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-auto opacity-45" />
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className=" h-12 p-7 pl-10 text-lg focus:outline-none rounded-xl opacity-50 w-full"
                      />
                      <button
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-4 bg-transparent hover:opacity-45 hover:ease-out duration-500"
                      >
                        {!showPassword ? (
                          <EyeOff size={24} className="opacity-50 " />
                        ) : (
                          <Eye size={24} className="opacity-50" />
                        )}
                      </button>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 opacity-45" />
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />            
            <button
              type="submit"
              className="w-full bg-primary rounded-full border-transparent py-4 text-white hover:opacity-85 hover:ease-in-out"
            >
              Sign In
            </button>
            <FormLabel className="text-center justify-center flex">
              <Link to="/signup" className="text-primary hover:underline">
                forgot password ?
              </Link>
            </FormLabel>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default SignForm;
