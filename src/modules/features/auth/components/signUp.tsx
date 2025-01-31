import FormRegistration from './formData'
 const SignUp = () => {
  return (
    <div>
      <h3>WebName</h3>
      <h6>Sign Up</h6>
      <p>
        By continuing , you agree to our <span>terms of use</span>and{" "}
        <span>Privacy Policy</span>
      </p>
      <div>
        <div><FormRegistration/></div>
        <div>{/* image  */}</div>
      </div>
      <div>
        {" "}
        <button>Continue</button>
      </div>
      <div>
        <br /> or <br />
      </div>
      <div>
        <div>
            {/* google linkdin */}
        </div>
        <div><p>Already have an accont ?</p></div>
      </div>
      <div>
        <span>Sign In</span>
      </div>
    </div>
  );
};

export default SignUp;
