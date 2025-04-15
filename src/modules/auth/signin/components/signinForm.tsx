'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router';
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

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useSignin();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const loginData = values;
    mutate(loginData as unknown as LoginRequest);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#98E9AB]/30 to-[#98E9AB]/50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <img src="/assets/logo.svg" alt="Logo" className="h-8" />
          </div>
          <h2 className="mt-4 mb-2 text-2xl font-semibold">Sign in</h2>
          <p className="text-sm text-gray-500">
            Sign in to access your account and continue your work
          </p>
        </div>

        <div className="mb-6">
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-gray-200"></div>
            <span className="absolute bg-white px-3 text-sm text-gray-500">
              sign in with email
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {[
              {
                name: 'email',
                placeholder: 'Email',
                type: 'text',
                icon: <Mail className="h-5 w-5 text-gray-400" />,
              },
              {
                name: 'password',
                placeholder: 'Password',
                type: showPassword ? 'text' : 'password',
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
                name={name as 'email' | 'password'}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={type}
                          placeholder={placeholder}
                          {...field}
                          className="!rounded-lg !border-gray-200 !py-6 !pl-10"
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          {icon}
                        </span>
                        {name === 'password' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowPassword(!showPassword);
                            }}
                            aria-label={
                              showPassword ? 'Hide password' : 'Show password'
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                          >
                            {toggleIcon}
                          </button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="mt-1 text-xs" />
                  </FormItem>
                )}
              />
            ))}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className={`!w-full !rounded-lg !py-6 !font-medium !text-white !transition-colors ${
                  isLoading
                    ? '!bg-gray-400'
                    : '!bg-[#98E9AB] hover:!bg-[#7ad98e]'
                }`}
              >
                {isLoading ? 'Creating account...' : 'Continue'}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
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
          <div className="relative mb-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-200"></div>
            <span className="absolute bg-white px-3 text-sm text-gray-500">
              or continue with
            </span>
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <div className="w-full space-y-3 place-self-center">
            <Google />
            <Linkedin />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-green-500 hover:underline">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-green-500 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignForm;
