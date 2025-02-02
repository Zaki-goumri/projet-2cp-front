"use client";

import { Alert } from "@mui/material";
import SignForm from "@/modules/features/auth/signin/components/signinForm";
import Google from "./components/googleButton";
import { useState } from "react";




const Signin = () => {
    const [width, setWidth] = useState(screen.width-50)

   const  handleSizeChange = () => {
        setWidth(screen.width/2)
    }

  return (
      <main onResize={handleSizeChange} className="flex flex-col h-screen items-center justify-center gap-5 overflow-hidden ">
        <section className="flex flex-col items-center justify-center gap-y-6 ">
          <img src="/assets/logo.svg" alt="hero" className="w-[70%] h-[70%]" />
          <p className="text-3xl font-bold text-center"> Sign in</p>
        </section>
        <section className=" flex justify-evenly items-center w-screen">
          <aside>
            <SignForm />
          </aside>
          <aside className="hidden lg:block">
            <img  src="/assets/signinHero.svg" alt="hero" className="w-[80%] h-[80%]" />
          </aside>
        </section>
        <section className="flex flex-col justify-center items-center gap-10 w-full">
          <span className="flex justify-center items-center gap-10 w-full">
            <hr className="w-1/6 opacity-47 " />
            <p className="text-2xl opacity-47 "> or</p>
            <hr className="w-1/6 opacity-47 " />
          </span>
        <span>
          <Google width={width} />

          {/* <a onClick={() => login()}>Sign in with Google 🚀</a> */}
        </span>
        </section>
      </main>
  );
};
export default Signin;
