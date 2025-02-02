"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { serialize } from "cookie";
import { Eye, EyeOff,Mail,Lock } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(50),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(50),
});

const SignForm = () => {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isMatch, setIsMatch] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    //   axios.post(`/auth/login`,values)
    //     .then(response => {
    //       const { accessToken, refreshToken } = response.data;
    //       document.cookie = serialize('accessToken', accessToken, {
    //         httpOnly: false,
    //         expires: new Date(Date.now() + 60 * 60 * 1000)
    //       });
    //       document.cookie = serialize('refreshToken', refreshToken, {
    //         httpOnly: false,
    //         expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    //       });
    //         push(`/home`)
    //     })
    //     .catch(error => {
    //     const message = error.response?.data?.message || 'An error occurred';
    //     setIsMatch(message);
    //     });
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-5 sm:p-10 md:p-12 rounded-lg shadow-lg h-md mx-4">
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
                      <span
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 bg-transparent hover:opacity-45"
                      >
                        {!showPassword ? (
                          <EyeOff size={24} className="opacity-50" />
                        ) : (
                          <Eye size={24} className="opacity-50" />
                        )}
                      </span>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 opacity-45" />
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isMatch && (
              <Alert severity="error" className="duration-100">
                {isMatch}
              </Alert>
            )}
            <button
              type="submit"
              className="w-full bg-primary rounded-full py-4 text-white hover:opacity-85 hover:ease-in-out"
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
}
export default SignForm;