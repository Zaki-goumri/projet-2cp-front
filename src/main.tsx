import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./index.css"
import React, { Suspense } from 'react';
import { ForgotPassword } from "./modules/features/auth/forgot-password/page";
const App = React.lazy(() => import('./App'));
const Signin = React.lazy(() => import('./modules/features/auth/signin/page'));
const Footer = React.lazy(() => import('./modules/shared/components/footer'));

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<Signin/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
        </Routes>
      </Router>
      </Suspense>
    </StrictMode>
  );
}
