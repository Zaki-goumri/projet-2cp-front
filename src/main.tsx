import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import SignUp from "./modules/features/auth/components/SignUP/signUp";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUp />}></Route>
          
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}
