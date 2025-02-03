import CtaButton from "@/modules/shared/components/CtaButton"
import { forgotPassformValues, ForgotPasswordForm } from "./components/forgotPasswordForm"

export const ForgotPassword = (props: {}) => {
  async function onSubmit(values: forgotPassformValues)  {
   console.log('Reset password link sent to your email'+ values.email)

  }

  return (
     <main className="flex flex-col justify-around h-[100vh]   md:px-10">
      <div className=' mt-32 flex justify-center  '>
  <img src="/assets/logo.svg" alt="hero" className="" />
      </div>
      <section className='flex justify-around items-center '>
        <div className="flex flex-col   justify-center gap-30 md:gap-6 items-center lg:items-start xl:items-start"><h1 className='text-5xl font-bold flex gap-4 '> Forgot <p className='text-primary text-5xl'> Password</p>?</h1>

          
          
      
         <h3 className="text-2xl md:text-center md:mx-4 sm:text-center text-center lg:text-left lg:mx-0 ">We've sent you a link to reset your password. Enter your E-mail.</h3>

          <ForgotPasswordForm submit={onSubmit} />
        </div>

      
        <aside>
       <img src='assets/forgotPasswordHero.svg' alt='hero' className="hidden lg:block xl:bloc"/>
        </aside>
      </section>
       </main>
  )
}
