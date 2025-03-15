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
import CtaButton from '@/modules/shared/components/CtaButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, EyeOff, Mail, SendHorizonal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
      'Password is required'
    );

  async function handleHorizontalClick() {
    if (!ableToReqEmail) return toast.error('Please wait until the timer ends');
    const isValid = await form.trigger();
    if (!isValid) return;

    setAbleToReqEmail(false);
    SendEmailMutation.mutate({ email: form.getValues('email') });
  }
  async function submit(values: z.infer<typeof formSchema>) {
    if (!isOtpShown) {
      return toast.error('Please submit your email first');
    }
    resetPasswordMutation.mutate({
      email: values.email,
      password: values.password ?? '',
      otp: value,
    });
  }
  // NOTE: this is changed based on whether we got an ok req from the backend
  // TODO:make the counter exponential instead of fixed
  const [counter, setCounter] = useState<number>(15);
  const [isOtpShown, setIsOtpShown] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [ableToReqEmail, setAbleToReqEmail] = useState<boolean>(true);
  const [showPass, setShowPass] = useState<boolean>(false);
  useEffect(() => {
    if (ableToReqEmail) {
      return;
    }
    const timer = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    if (counter == 0) {
      setCounter(30);
      setAbleToReqEmail(true);
    }
    return () => clearTimeout(timer);
  }, [counter, ableToReqEmail]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { SendEmailMutation, resetPasswordMutation } = useForgotPassword({
    onSuccess: () => setIsOtpShown(true),
  });

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((val) => submit(val))}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="E-mail"
                        {...field}
                        className="h-12 w-full rounded-xl p-7 pr-20 pl-10 text-lg opacity-50 focus:outline-none"
                      />
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-auto opacity-45" />
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <SendHorizonal
                          type="submit"
                          className={
                            ableToReqEmail ? 'text-primary' : 'opacity-45'
                          }
                          onClick={handleHorizontalClick}
                        />
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isOtpShown && (
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex justify-center">
                        <Input
                          type={showPass ? 'text' : 'password'}
                          placeholder="Password"
                          {...field}
                          className="h-12 w-full rounded-xl p-7 pr-20 pl-10 text-lg opacity-50 focus:outline-none"
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          {showPass ? (
                            <EyeOff
                              className="h-5 w-auto opacity-45"
                              onClick={() => setShowPass(false)}
                            />
                          ) : (
                            <Eye
                              className="h-5 w-auto opacity-45"
                              onClick={() => setShowPass(true)}
                            />
                          )}{' '}
                        </span>
                        <span className="absolu te inset-y-0 right-0 flex items-center pr-3"></span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}{' '}
          {!ableToReqEmail && (
            <div>
              <p className="text-sm text-red-500">
                You can request a new OTP in {counter} seconds
              </p>
            </div>
          )}
          {/* NOTE: change pattern in case change in OTP input */}
          {isOtpShown && (
            <span className="flex w-full justify-center px-10 lg:justify-start lg:px-0">
              {' '}
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                onChange={(e) => {
                  setValue(e);
                }}
                value={value}
              >
                <ul className="flex justify-center space-x-2 rounded-xl">
                  {Array.from({ length: 6 }, (_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="h-12 w-12 rounded-md border"
                    />
                  ))}
                </ul>
              </InputOTP>
            </span>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`rounded-lg !px-40 !py-4 text-white duration-400 ease-in-out ${value.length !== 6 ? 'cursor-not-allowed bg-gray-400' : 'bg-primary'}`}
              disabled={value.length !== 6}
            >
              Continue
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ForgotPasswordForm;
