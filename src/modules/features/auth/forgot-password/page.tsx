import CtaButton from "@/modules/shared/components/CtaButton"
import { forgotPassformValues, ForgotPasswordForm } from "./components/forgotPasswordForm"

export const ForgotPassword = (props: {}) => {
  async function onSubmit(values: forgotPassformValues)  {
   console.log('Reset password link sent to your email'+ values.email)

  }

  return (
     <main className="flex flex-col justify-around h-[100vh]">
      <div className=' mt-10 flex justify-center '>
  <img src="/assets/logo.svg" alt="hero" className="" />
      </div>
      <section className='flex justify-around items-center '>
        <div className="flex flex-col gap-6"><h1 className='text-5xl font-bold flex gap-4 flex-row'> Forgot <p className='text-primary text-5xl'> Password</p>?</h1>
          
      
         <h3 className="text-2xl">We've sent you a link to reset your password. Enter your E-mail.</h3>

          <ForgotPasswordForm submit={onSubmit} />
        </div>

      
        <aside>
       <img src='assets/forgotPasswordHero.svg' alt='hero'/>
        </aside>
      </section>
       </main>
  )
}
