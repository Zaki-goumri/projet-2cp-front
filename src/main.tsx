import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import './index.css';
import { Suspense, lazy } from 'react';
import SignUp from './modules/auth/signup/page';
import Loading from './loading';
import ForgotPassword from './modules/auth/forgot-password/page';
import ProfilePage from './modules/ProfileManagement/page';
import { NotificationProvider } from './modules/notifications/context/NotificationContext';
import MainLayout from './components/layouts/MainLayout';
import LayoutWithoutFooter from './components/layouts/LayoutWithoutFooter';
import NotFound from './components/ui/NotFound';
const Dashboard = lazy(() => import('./modules/Dashboard/page'));
const App = lazy(() => import('./App'));
const Signin = lazy(() => import('./modules/auth/signin/page'));
const Home = lazy(() => import('./modules/home/page'));
const Opportunity = lazy(() => import('./modules/opportunity/page'));
const OAuthCallback = lazy(() => import('./modules/auth/signin/components/googleCallback'));
const LinkedInCallback = lazy(() => import('./modules/auth/signin/components/linkedinCallback'));
const Teams = lazy(() => import('./modules/teams/components/TeamsOverview'));
const TeamDetail = lazy(() => import('./modules/teams/pages/TeamDetailPage'));
const NotificationsPage = lazy(() => import('./modules/notifications/pages/NotificationsPage'));
import InternshipsAndProblemsPage from './modules/internships&problems/page';
import CreateTeamCard from './modules/teams/components/CreateTeamCard';
import { ToastContainer } from 'react-toastify';
const Chat = lazy(()=>import('./modules/chat/page'));

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <main>
      <Suspense fallback={<Loading />}>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Auth routes */}
              <Route path="/google/callback" element={<OAuthCallback />} />
              <Route path="/linkedin/callback" element={<LinkedInCallback />} />
              <Route path="auth">
                <Route index element={<div/>}/>
                <Route path="signin" element={<Signin />} />
                <Route path="password/forget" element={<ForgotPassword />} />
                <Route path="signup" element={<SignUp />}/>
              </Route>
              
              <Route path='/chat' element={<LayoutWithoutFooter><Chat/></LayoutWithoutFooter>}/>
              <Route path='/chat/:id' element={<LayoutWithoutFooter><Chat/></LayoutWithoutFooter>}/>
              <Route path="/" element={<MainLayout><App /></MainLayout>} />
              <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/notifications" element={<LayoutWithoutFooter><NotificationsPage /></LayoutWithoutFooter>} />
              <Route path="/opportunities/:id" element={<LayoutWithoutFooter><Opportunity /></LayoutWithoutFooter>} />
              <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
              <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
              <Route path="/search" element={<MainLayout><InternshipsAndProblemsPage /></MainLayout>} />
              <Route path="teams">
                <Route index element={<LayoutWithoutFooter><Teams /></LayoutWithoutFooter>} />
                <Route path="create" element={<MainLayout><CreateTeamCard /></MainLayout>} />
                <Route path=":teamId" element={<LayoutWithoutFooter><TeamDetail /></LayoutWithoutFooter>} />
              </Route>
              
              {/* Not found route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </Suspense>
    </main>
  );
}
