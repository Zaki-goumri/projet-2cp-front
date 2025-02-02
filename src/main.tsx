import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import App from "./App";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </StrictMode>
  );
}
