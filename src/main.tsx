import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import './index.css';
import React, { Suspense } from 'react';
import SignUp from './modules/auth/signup/page';
import Loading from './loading';
import ForgotPassword from './modules/auth/forgot-password/page';
import ProfilePage from './modules/ProfileManagement/page';
import NavBar from './modules/shared/components/navBar';
const Dashboard = React.lazy(() => import('./modules/Dashboard/page'));
const App = React.lazy(() => import('./App'));
const Signin = React.lazy(() => import('./modules/auth/signin/page'));
const Home = React.lazy(() => import('./modules/home/page'));
const Opportunity = React.lazy(() => import('./modules/opportunity/page'));
const OAuthCallback = React.lazy(() => import('./modules/auth/signin/components/googleCallback'));
const LinkedInCallback = React.lazy(() => import('./modules/auth/signin/components/linkedinCallback'));
const Teams = React.lazy(() => import('./modules/teams/components/TeamsOverview'));
const TeamPage = React.lazy(() => import('./modules/Dashboard/components/team_page'));
import CreateTeamCard  from './modules/teams/components/CreateTeamCard';

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
            <Route path="*" element={<div>Not Found</div>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teams">
              <Route index element={<Teams />} />
              <Route path="create" element={<CreateTeamCard />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </main>
  );
}
