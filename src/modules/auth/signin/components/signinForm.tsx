'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from '@/modules/shared/icons';
import { Link, useLocation } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Google = React.lazy(() => import('./googleButton'));
const Linkedin = React.lazy(
  () => import('@/modules/auth/signin/components/linkedinButtton')
);
import useSignin from '@/modules/auth/signin/hooks/useSignin';
import type { LoginRequest } from '../types/signin.types';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(50),
  password: z.string().min(1, 'Password is required').max(50),
});

const SignForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useSignin(location.state?.from);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const loginData = values;
    mutate(loginData as unknown as LoginRequest);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#98E9AB]/20 via-white to-[#98E9AB]/10 px-4">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to continue to your account
            </p>
          </div>

          <div className="mb-6 space-y-3">
            <Google />
            <Linkedin />
          </div>

          <div className="relative my-6 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-3 flex-shrink text-sm text-gray-500">or continue with email</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Email"
                          type="email"
                          {...field}
                          className="h-12 rounded-lg border-gray-200 bg-gray-50/50 pl-10 pr-4 text-gray-900 focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
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
                        <LockIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="h-12 rounded-lg border-gray-200 bg-gray-50/50 pl-10 pr-10 text-gray-900 focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end">
                <Link
                  to="/auth/password/forget"
                  className="text-sm font-medium text-[#98E9AB] hover:text-[#7ad98e] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-lg bg-[#98E9AB] font-medium text-white shadow-md shadow-[#98E9AB]/20 transition-all hover:bg-[#7ad98e] hover:shadow-lg hover:shadow-[#98E9AB]/30 disabled:bg-gray-300 disabled:shadow-none"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </Form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/auth/signup" className="font-medium text-[#98E9AB] hover:text-[#7ad98e] hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-[#98E9AB] hover:underline">
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-[#98E9AB] hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignForm;
