import { lazy } from 'react';
const Dashboard = lazy(() => import('./components/dashboard'));

const DashboardPage = () => {
  return (
    <div className="h-fit border-2 border-gray-200 bg-gray-50 shadow-md">
      <div className="py-4 sm:py-6 md:py-8">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
