import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import App from "./App";
// import SignUp from "./modules/features/auth/components/SignUP/signUp";
import SignIn from "./modules/features/auth/components/SignIN/signIn";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignIn />}/>
        </Routes>
      </Router>
    </StrictMode>
  );
}
