import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import './index.css';
import React, { Suspense } from 'react';
import SignUp from './modules/features/auth/signup/page';
import Loading from './loading';
import ForgotPassword from './modules/features/auth/forgot-password/page';
import ProfilePage from './modules/features/ProfileManagement/page';
const App = React.lazy(() => import('./App'));
const Signin = React.lazy(() => import('./modules/features/auth/signin/page'));
const Home = React.lazy(() => import('./modules/features/home/page'));
const Opportunity = React.lazy(
  () => import('./modules/features/opportunity/page')
);
const OAuthCallback = React.lazy(
  () => import('./modules/features/auth/signin/components/googleCallback')
);
const LinkedInCallback = React.lazy(
  () => import('./modules/features/auth/signin/components/linkedinCallback')
);

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <main>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/google/callback" element={<OAuthCallback />} />
            <Route path="/linkedin/callback" element={<LinkedInCallback />} />
            <Route path="/" element={<App />} />
            <Route path="auth">
              <Route index element={<div>Auth Home</div>} />
              <Route path="signin" element={<Signin />} />
              <Route path="password/forget" element={<ForgotPassword />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/opportunities/:id" element={<Opportunity />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </Suspense>
    </main>
  );
}
