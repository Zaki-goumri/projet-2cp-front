
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import CtaButton from '@/modules/shared/components/CtaButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, SendHorizonal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod'
const formSchema=z.object({
    email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(50),

  })
export type forgotPassformValues=z.infer<typeof formSchema>

interface ForgotPasswordFormProps {
  submit : (values: forgotPassformValues) => void
}

export const ForgotPasswordForm = ({submit}: ForgotPasswordFormProps) => {
  const inputRef=useRef<HTMLInputElement>(null)
  async function handleHorizontalClick(){
    const isValid=await form.trigger();
    if (!isValid) return;
    setAbleToReqEmail(false)
    console.log('Resend OTP')
  }
 async function handleOtpSubmit(Otp:string){
 console.log('OTP is '+Otp)
 } 
  // NOTE: this is changed based on whether we got an ok req from the backend
  const [counter,setCounter]=useState<number>(30)
  const [isOtpShown, setIsOtpShown] =useState<boolean>(true);
  // The Current value of the OTP doesn't matter to much
  const [value,setValue]=useState<string>('')
  // NOTE: this to be changed based on the counter to resend again a request to get the OTP
  const [ableToReqEmail, setAbleToReqEmail] = useState<boolean>(true);
  useEffect(()=>{
    if (ableToReqEmail){
      return
    }
    const timer=setTimeout(()=>{
      setCounter((prev)=>prev-1)
    },1000)
    if(counter==0){
      setCounter(30)
      setAbleToReqEmail(true)
    }
    return ()=>clearTimeout(timer)
  },[counter,ableToReqEmail])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
 
  return (
    <div className=''>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-6">

          <div className='flex'> <FormField
            control={form.control}
            
            name="email"
            render={({ field }) => (
              <FormItem >
                <FormControl>
                  <div className="relative">
                    <Input                       placeholder="E-mail"
                      {...field}
                      className=" h-12 p-7  pl-10 pr-20 text-lg focus:outline-none rounded-xl opacity-50  w-full   "
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-auto opacity-45" />
                    </span>
                    <span className='absolute inset-y-0 right-0 flex items-center pr-3'>
<SendHorizonal type='submit' className={ableToReqEmail?"text-primary":"opacity-45"} onClick={handleHorizontalClick}/>

                    </span>

                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
                       
          />
            
          </div>
{!ableToReqEmail&&(   <div>
              <p className='text-red-500 text-sm'>You can request a new OTP in {counter} seconds</p>
            </div>
            )            }


          {/* NOTE: change pattern in case change in OTP input */}
          
          { isOtpShown&& (          <span className='w-full flex justify-center px-10 lg:justify-start lg:px-0'>  <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={(e)=>{setValue(e)}} value={value} onSubmit={()=>handleOtpSubmit(value)} >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTP>
          </span>          )
         
          }
              <div className="flex justify-center"><CtaButton Text="Continue" Color={value.length==6?"bg-primary  ":'bg-gray-400 '} Style={ `!px-40 !py-4 ease-in-out duration-400 ${value.length!=6 && "!cursor-not-allowed"}`  }/>
      </div>

                     </form>
               
                </Form>

    </div>
  )
}

