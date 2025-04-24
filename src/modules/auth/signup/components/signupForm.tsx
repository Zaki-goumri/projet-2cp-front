'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import useSignup from '@/modules/auth/signup/hooks/useSignup';
import { RegisterRequest } from '../types/signup.types';

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address')
      .max(50),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .max(50),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    name: z.string().min(1, 'Full Name is required').max(50),
    phoneNumber: z.string().min(1, 'Phone Number is required').max(50),
    type: z.enum(['company', 'student']),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phoneNumber: '',
      type: 'student',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isLoading } = useSignup();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { confirmPassword, ...registrationData } = values;
    mutate(registrationData as RegisterRequest);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#98E9AB]/20 via-white to-[#98E9AB]/10 p-4">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="p-8">
            <div className="mb-6 flex justify-center">
              <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
              Create an account
            </h1>
            <p className="mb-8 text-center text-sm text-gray-600">
              Join us to start posting jobs and building your remote team
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Email"
                            type="email"
                            className="h-12 rounded-lg !border-none bg-gray-50/50 pr-4 pl-10 text-gray-900 focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Full Name"
                            type="text"
                            className="h-12 rounded-lg !border-none bg-gray-50/50 pr-4 pl-10 text-gray-900 focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Phone Number"
                            type="tel"
                            className="h-12 rounded-lg !border-none bg-gray-50/50 pr-4 pl-10 text-gray-900 focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
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
                          <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
                            className="h-12 rounded-lg !border-none bg-gray-50/50 pr-10 pl-10 text-gray-900 focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="h-12 rounded-lg !border-none bg-gray-50/50 pr-10 pl-10 text-gray-900 focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="h-12 rounded-lg !border-none bg-gray-50/50 pr-4 pl-10 !text-gray-400 focus:ring focus:ring-[#98E9AB]/20">
                              <SelectValue placeholder="Account Type" />
                            </SelectTrigger>
                            <SelectContent className="!border-none !bg-white">
                              {['student', 'company'].map((type) => (
                                <SelectItem
                                  key={type}
                                  value={type}
                                  className="!border-none !bg-white !text-gray-400 focus:bg-[#98E9AB]/10"
                                >
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="!mt-6 !h-12 !w-full !rounded-lg !bg-[#98E9AB] !font-medium !text-white !shadow-md !shadow-[#98E9AB]/20 !transition-all hover:!bg-[#7ad98e] hover:!shadow-lg hover:!shadow-[#98E9AB]/30 disabled:!bg-gray-300 disabled:!shadow-none"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/auth/signin"
                  className="font-medium text-[#98E9AB] hover:text-[#7ad98e] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-[#98E9AB] hover:underline">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-[#98E9AB] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
