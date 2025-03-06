"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import useSignup from "@/modules/features/auth/signup/hooks/useSignup";
import { RegisterRequest } from "../types/signup.types";
import { toast } from "react-toastify";

const formSchema = z
  .object({
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
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    name: z.string().min(1, "Full Name is required").max(50),
    phoneNumber: z.string().min(1, "Phone Number is required").max(50),
    type: z.enum(["company", "student"]),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phoneNumber: "",
      type: "student",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isLoading, error } = useSignup();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { confirmPassword, phoneNumber, ...registrationData } = values;
    mutate(registrationData as RegisterRequest);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#98E9AB]/30 to-[#98E9AB]/10 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="mb-6 flex justify-center">
              <img src="/assets/logo.svg" alt="Logo" className="h-8" />
            </div>

            <h1 className="text-2xl font-semibold text-center mb-2">Sign up</h1>
            <p className="text-gray-500 text-center text-sm mb-6">
              Create an account to start posting jobs and build your remote team
            </p>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-3 text-sm text-gray-500">
                or sign up with email
              </span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {[
                  {
                    name: "email",
                    placeholder: "Email",
                    icon: Mail,
                    type: "text",
                  },
                  {
                    name: "name",
                    placeholder: "Full Name",
                    icon: User,
                    type: "text",
                  },
                  {
                    name: "phoneNumber",
                    placeholder: "Phone Number",
                    icon: Phone,
                    type: "text",
                  },
                  {
                    name: "password",
                    placeholder: "Password",
                    icon: Lock,
                    type: showPassword ? "text" : "password",
                    toggle: () => setShowPassword(!showPassword),
                    show: showPassword,
                  },
                  {
                    name: "confirmPassword",
                    placeholder: "Confirm Password",
                    icon: Lock,
                    type: showConfirmPassword ? "text" : "password",
                    toggle: () => setShowConfirmPassword(!showConfirmPassword),
                    show: showConfirmPassword,
                  },
                ].map((field, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={
                      field.name as
                        | "email"
                        | "password"
                        | "confirmPassword"
                        | "name"
                        | "phoneNumber"
                        | "type"
                    }
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              type={field.type}
                              placeholder={field.placeholder}
                              className="!pl-10 !py-6 !rounded-lg !border-gray-200"
                              {...formField}
                            />
                            {field.toggle && (
                              <button
                                type="button"
                                onClick={field.toggle}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                              >
                                {field.show ? (
                                  <EyeOff className="h-5 w-5" />
                                ) : (
                                  <Eye className="h-5 w-5" />
                                )}
                              </button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="!pl-10 !py-6 !rounded-lg !border-gray-200 !text-black/40">
                              <SelectValue placeholder="Account Type" />
                            </SelectTrigger>
                            <SelectContent className="!bg-white !border-none">
                              {["student", "company"].map((type) => (
                                <SelectItem
                                  key={type}
                                  value={type}
                                  className="!bg-white !border-0 hover:!bg-gray-200 !text-black/40"
                                >
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="!w-full !py-6 !bg-[#98E9AB] hover:!bg-[#7ad98e] !text-white !font-medium !rounded-lg !transition-colors"
                >
                  {isLoading ? "Creating account..." : "Continue"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/auth/signin"
                  className="text-[#98E9AB] font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-center mt-6 text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#98E9AB] hover:underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#98E9AB] hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
