"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/api/axios.config";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Google = React.lazy(() => import("./googleButton"));
const Linkedin = React.lazy(
  () => import("@/modules/features/auth/signin/components/linkedinButtton"),
);
import useSignin from "@/modules/features/auth/signin/hooks/useSignin";
import type { LoginRequest } from "../types/signin.types";

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

  const { mutate, isLoading } = useSignin();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const loginData = values;
    mutate(loginData as unknown as LoginRequest);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#e8f5e9]">
      <div className="bg-white p-8 rounded-xl shadow-lg mx-4 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <img src="/assets/logo.svg" alt="Logo" className="h-8" />
          </div>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Sign in</h2>
          <p className="text-gray-500 text-sm">
            Sign in to access your account and continue your work
          </p>
        </div>

        <div className="mb-6">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-sm text-gray-500 absolute">
              sign in with email
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {[
              {
                name: "email",
                placeholder: "Email",
                type: "text",
                icon: <Mail className="h-5 w-5 text-gray-400" />,
              },
              {
                name: "password",
                placeholder: "Password",
                type: showPassword ? "text" : "password",
                icon: <Lock className="h-5 w-5 text-gray-400" />,
                toggleIcon: showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                ),
              },
            ].map(({ name, placeholder, type, icon, toggleIcon }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as "email" | "password"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={type}
                          placeholder={placeholder}
                          {...field}
                          className="!pl-10 !py-6 !rounded-lg !border-gray-200"
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          {icon}
                        </span>
                        {name === "password" && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowPassword(!showPassword);
                            }}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                          >
                            {toggleIcon}
                          </button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
            ))}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className={`!w-full !py-6 !text-white !font-medium !rounded-lg !transition-colors ${
                  isLoading ? "!bg-gray-400" : "!bg-[#98E9AB] hover:!bg-[#7ad98e]"
                }`}
              >
                {isLoading ? "Creating account..." : "Continue"}
              </Button>
            </div>

            <div className="text-center text-sm mt-4">
              <Link
                to="/auth/password/forget"
                className="text-green-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </Form>

        {/* Social Login Section */}
        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-sm text-gray-500 absolute">
              or continue with
            </span>
            <div className="border-t border-gray-200 w-full"></div>
          </div>

          <div className="place-self-center space-y-3 w-full">
            <Google />
            <Linkedin />
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </div>

        <div className="text-xs text-center text-gray-400 mt-8">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-green-500 hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-green-500 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignForm;
