import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import './index.css';
import { Suspense, lazy } from 'react';
import SignUp from './modules/auth/signup/page';
import Loading from './loading';
import ForgotPassword from './modules/auth/forgot-password/page';
import ProfilePage from './modules/ProfileManagement/page';
import MainLayout from '@/modules/shared/layouts/MainLayout';
import LayoutWithoutFooter from '@/modules/shared/layouts/LayoutWithoutFooter';
import NotFound from './components/ui/NotFound';
import { ProtectedRoute } from './modules/shared/components/ProtectedRoute';
const Dashboard = lazy(() => import('./modules/Dashboard/page'));
const App = lazy(() => import('./App'));
const Signin = lazy(() => import('./modules/auth/signin/page'));
const Home = lazy(() => import('./modules/home/page'));
const OpportunityDetaitls = lazy(() => import('./modules/post/page'));
const OpportunitiesPage = lazy(() => import('./modules/opportunities/page'));
const OAuthCallback = lazy(
  () => import('./modules/auth/signin/components/googleCallback')
);
const LinkedInCallback = lazy(
  () => import('./modules/auth/signin/components/linkedinCallback')
);
const Teams = lazy(() => import('./modules/teams/pages/TeamsPage'));
const TeamDetail = lazy(() => import('./modules/teams/pages/TeamDetailPage'));
const NotificationsPage = lazy(
  () => import('./modules/notifications/pages/NotificationsPage')
);
import InternshipsAndProblemsPage from './modules/internships&problems/page';
import CreateTeamCard from './modules/teams/components/CreateTeamCard';
const Chat = lazy(() => import('./modules/chat/page'));
import { QueryProvider } from './modules/shared/providers/QueryProvider';
import CreateOpportunityPage from './modules/post/components/opportunity.create';
const QAPage = lazy(() => import('./modules/qa/page'));
const ContactPage = lazy(() => import('./modules/contact/page'));
const CompanyDashboard = lazy(() => import('./modules/company/page'));
const ApplicationDetailPage = lazy(
  () => import('./modules/company/pages/ApplicationDetailPage')
);
const JobApplicationsPage = lazy(
  () => import('./modules/company/pages/JobApplicationsPage')
);
const EditPostPage = lazy(() => import('./modules/company/pages/EditPostPage'));
const InterviewPage = lazy(() => import('./modules/interview/page'));
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <main>
      <Suspense fallback={<Loading />}>
        <QueryProvider>
          <Router>
            <Routes>
              {/* Auth routes */}
              <Route path="/google/callback" element={<OAuthCallback />} />
              <Route path="/linkedin/callback" element={<LinkedInCallback />} />
              <Route path="auth">
                <Route index element={<div />} />
                <Route path="signin" element={<Signin />} />
                <Route path="password/forget" element={<ForgotPassword />} />
                <Route path="signup" element={<SignUp />} />
              </Route>

              {/* Public routes */}
              <Route
                path="/"
                element={
                  <MainLayout>
                    <App />
                  </MainLayout>
                }
              />
              <Route
                path="/home"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />
              <Route
                path="/qa"
                element={
                  <MainLayout>
                    <QAPage />
                  </MainLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <MainLayout>
                    <ContactPage />
                  </MainLayout>
                }
              />
              <Route
                path="/company/test"
                element={
                  <MainLayout>
                    <CompanyDashboard />
                  </MainLayout>
                }
              />
              <Route
                path="/company/applications/:appId"
                element={
                  <MainLayout>
                    <ApplicationDetailPage />
                  </MainLayout>
                }
              />
              <Route
                path="/company/post/applications/:postId"
                element={
                  <MainLayout>
                    <JobApplicationsPage />
                  </MainLayout>
                }
              />
              <Route
                path="/company/post/edit/:postId"
                element={
                  <MainLayout>
                    <EditPostPage />
                  </MainLayout>
                }
              />

              {/* Protected routes */}
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <Chat />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/opportunity/create"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <CreateOpportunityPage />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat/:id"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <Chat />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <NotificationsPage />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/opportunities"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <OpportunitiesPage />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/opportunities/:id"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <OpportunityDetaitls />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:userName"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <ProfilePage />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <InternshipsAndProblemsPage />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />
              <Route path="teams">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <LayoutWithoutFooter>
                        <Teams />
                      </LayoutWithoutFooter>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <CreateTeamCard />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":teamId"
                  element={
                    <ProtectedRoute>
                      <LayoutWithoutFooter>
                        <TeamDetail />
                      </LayoutWithoutFooter>
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="/teams/:teamId"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <TeamDetail />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interview"
                element={
                  <ProtectedRoute>
                    <LayoutWithoutFooter>
                      <InterviewPage />
                    </LayoutWithoutFooter>
                  </ProtectedRoute>
                }
              />

              {/* Not found route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </QueryProvider>
      </Suspense>
    </main>
  );
}
