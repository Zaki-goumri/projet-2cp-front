import { lazy } from "react";
const SignUpForm = lazy(() => import("./components/signupForm"));
import { ToastContainer } from "react-toastify";
const QueryClient = lazy(
  () => import("@/modules/shared/components/ReactQueryProvider"),
);

export default function SignUp() {
  return (
    <QueryClient>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SignUpForm />
    </QueryClient>
  );
}
