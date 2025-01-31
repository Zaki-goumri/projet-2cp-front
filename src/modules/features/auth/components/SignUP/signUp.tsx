import FormRegistration from "./formData";
const SignUp = () => {
  return (
    <div className="flex flex-col justify-around items-center h-full m-8">
      <h1 className="text-5xl font-bold from-neutral-950">
        Web <span className="text-primary">Name</span>
      </h1>
      <h6 className="text-0.5ml font-black p-7">Sign Up</h6>
      <p>
        By continuing , you agree to our{" "}
        <span className="text-primary underline">terms of use</span> and{" "}
        <span className="text-primary underline">Privacy Policy</span>
      </p>
      <div className="flex flex-row flex-wrap items-center   h-auto p-6 justify-between max-w-full">
        <div className="flex ">
          <FormRegistration />
        </div>
        <div>
          <img src="../../../../../../public/assets/signup.svg" alt="34" />
        </div>
      </div>

      <div className="flex flex-row gap-1" >
        <hr className="flex-grow border-t border-black-400" />
        <span className="px-3 text-black-600">or</span>
        <hr className="flex-grow border-t border-black-400" />
      </div>

      <div className="flex flex-col  items-center">
        <p className="text-2ml from-neutral-400">Already have an account?</p>
        <span className="text-primary underline cursor-pointer">Sign In</span>
      </div>
    </div>
  );
};

export default SignUp;
