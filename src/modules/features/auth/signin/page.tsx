import { lazy } from "react";
const SigninForm = lazy(() => import("@/modules/features/auth/signin/components/signinForm"));
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
      <SigninForm />
    </QueryClient>
  );
}
