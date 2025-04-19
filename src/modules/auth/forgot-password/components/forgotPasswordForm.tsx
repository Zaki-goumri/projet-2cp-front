import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, SendHorizonal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import useForgotPassword from '../hooks/useForgotPassword';
import { toast } from 'react-toastify';

const ForgotPasswordForm = () => {
  const formSchema = z
    .object({
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address')
        .max(50),
      password: z.string().optional(),
    })
    .refine(
      (data) => !isOtpShown || (data.password?.length ?? 0) >= 6,
      'Password must be at least 6 characters'
    );

  const [counter, setCounter] = useState<number>(15);
  const [isOtpShown, setIsOtpShown] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [ableToReqEmail, setAbleToReqEmail] = useState<boolean>(true);
  const [showPass, setShowPass] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const { SendEmailMutation, resetPasswordMutation } = useForgotPassword({
    onSuccess: () => setIsOtpShown(true),
  });

  async function handleEmailSubmit() {
    if (!ableToReqEmail) {
      toast.error('Please wait until the timer ends');
      return;
    }

    const isValid = await form.trigger('email');
    if (!isValid) return;

    setAbleToReqEmail(false);
    SendEmailMutation.mutate({ email: form.getValues('email') });
  }

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    if (!isOtpShown) {
      toast.error('Please submit your email first');
      return;
    }
    resetPasswordMutation.mutate({
      email: values.email,
      password: values.password ?? '',
      otp: value,
    });
  }

  useEffect(() => {
    if (ableToReqEmail) return;

    const timer = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    if (counter === 0) {
      setCounter(30);
      setAbleToReqEmail(true);
    }

    return () => clearTimeout(timer);
  }, [counter, ableToReqEmail]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative group">
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    className="h-12 rounded-lg border-gray-200 bg-gray-50/50 pl-10 pr-10 text-gray-900 focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
                  />
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      ableToReqEmail
                        ? 'text-[#98E9AB] hover:text-[#7ED196] cursor-pointer'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <SendHorizonal className="h-5 w-5" />
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {isOtpShown && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative group">
                      <Input
                        type={showPass ? 'text' : 'password'}
                        placeholder="New password"
                        {...field}
                        className="h-12 rounded-lg border-gray-200 bg-gray-50/50 pl-10 pr-10 text-gray-900 focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >
                        {showPass ? (
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

            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center">Enter the verification code sent to your email</p>
              <div className="flex justify-center w-full">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={value}
                  onChange={(val) => setValue(val)}
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {Array.from({ length: 6 }, (_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-12 w-10 sm:w-12 rounded-lg border-gray-200 bg-gray-50/50 text-center text-lg font-semibold focus:bg-white focus:border-[#98E9AB] focus:ring focus:ring-[#98E9AB]/20"
                      />
                    ))}
                  </div>
                </InputOTP>
              </div>
            </div>
          </div>
        )}

        {!ableToReqEmail && (
          <p className="text-sm text-gray-600 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
            You can request a new code in <span className="font-semibold text-[#98E9AB]">{counter}</span> seconds
          </p>
        )}

        {isOtpShown && (
          <button
            type="submit"
            disabled={value.length !== 6}
            className={`w-full h-12 rounded-lg text-white font-medium transition-all ${
              value.length === 6
                ? 'bg-[#98E9AB] hover:bg-[#7ED196] shadow-md shadow-[#98E9AB]/20 hover:shadow-lg hover:shadow-[#98E9AB]/30'
                : 'bg-gray-300 cursor-not-allowed'
            } animate-in fade-in slide-in-from-bottom-4 duration-300`}
          >
            Reset Password
          </button>
        )}
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
