"use client";
import SignForm from "@/modules/features/auth/signin/components/signinForm";
import React, { Suspense } from "react";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
const Google = React.lazy(() => import("./components/googleButton"));
const Linkedin = React.lazy(
  () => import("@/modules/features/auth/signin/components/linkedinButtton")
);

const Signin = () => {
  return (
    <main className="flex flex-col h-screen items-center justify-center gap-5 overflow-hidden ">
      <ToastContainer />
      <section className="flex flex-col items-center justify-center gap-y-6 ">
        <img src="/assets/logo.svg" alt="hero" className="w-[70%] h-[70%]" />
        <p className="text-3xl font-bold text-center"> Sign in</p>
      </section>
      <section className=" flex justify-evenly items-center w-screen">
        <aside>
          <SignForm />
        </aside>
        <aside className="hidden lg:block">
          <img
            src="/assets/signinHero.svg"
            alt="hero"
            className="w-[80%] h-[80%]"
          />
        </aside>
      </section>
      <section className="flex flex-col justify-center items-center gap-10 w-full">
        <span className="flex justify-center items-center gap-10 w-full">
          <hr className="w-1/6 opacity-47 " />
          <p className="text-2xl opacity-47 "> or</p>
          <hr className="w-1/6 opacity-47 " />
        </span>
        <section className="flex justify-center items-center gap-5 w-full md:flex-col flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <Google />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Linkedin />
          </Suspense>
          <span className="flex flex-col items-center justify-center gap-2">
            <h3 className="opacity-55">Don&apos;t you have an account ?</h3>
            <Link
              to="/auth/signup"
              className="text-primary underline font-bold"
            >
              Sign up
            </Link>
          </span>
        </section>
      </section>
    </main>
  );
};
export default Signin;
