import SignUpForm from "./components/signUpForm";
import { Link } from "react-router";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const SignUp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col mt-20 h-screen items-center justify-center gap-5 zoom-0.8 ">
        <section className="flex flex-col items-center justify-center gap-y-6 ">
          <img src="/assets/logo.svg" alt="hero" className="w-[30%] " />
          <h3 className=" inline-block text-lg  text-center font-thin gap-2">
            By continuing, you agree to our
            <span className="font-semibold text-primary">&nbsp;terms of use </span>and{" "}
            <span className="text-primary font-semibold t">Privacy Policy.</span>
          </h3>
        </section>
        <section className=" flex justify-evenly items-center w-screen">
          <aside>
            <SignUpForm />
          </aside>
          <aside className="hidden lg:block">
            <img
              src="/assets/signUpHero.svg"
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
            <span className="flex flex-col items-center justify-center gap-2">
              <h3 className="opacity-55">Already have an account ?</h3>
              <Link
                to="/auth/signin"
                className="text-primary underline font-bold"
              >
                Sign In
              </Link>
            </span>
          </section>
        </section>
      </main>
    </QueryClientProvider>
  );
};

export default SignUp;
