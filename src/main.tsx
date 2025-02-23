import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./index.css";
import React, { Suspense } from "react";
import SignUp from "./modules/features/auth/signup/page";
import Loading from "./loading";
import ForgotPassword from "./modules/features/auth/forgot-password/page";
const App = React.lazy(() => import("./App"));
const Signin = React.lazy(() => import("./modules/features/auth/signin/page"));
const Footer = React.lazy(() => import("@/modules/shared/components/footer"));
const Home = React.lazy(() => import("./modules/features/home/page"));

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <main>
        <Suspense fallback={<Loading />}>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="auth">
                <Route index element={<div>Auth Home</div>} />
                <Route path="signin" element={<Signin />} />
                <Route path="password/forgot" element={<ForgotPassword />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
              <Route path="/home" element={<Home />} />
            </Routes>
            <Footer />
          </Router>
        </Suspense>
      </main>
    </StrictMode>
  );
}
