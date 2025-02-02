import { FaGoogle, FaLinkedin } from "react-icons/fa";

const SocialSignInButtons = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Google Button */}
      {/* <button className="flex items-center justify-center w-64 h-10 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-100 transition">
        <FaGoogle className="text-red-500 text-xl mr-2" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button> */}

      {/* LinkedIn Button */}
      <button className="flex items-center justify-center w-64 h-10 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-100 transition">
        <FaLinkedin className="text-blue-600 text-xl mr-2" />
        <span className="text-gray-700 font-medium">Sign in with LinkedIn</span>
      </button>
    </div>
  );
};

export default SocialSignInButtons;
