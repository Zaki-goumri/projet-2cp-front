// src/modules/Dashborad/page.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './components/dashboard';

// Create a client with optimized settings for dashboard data
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: true,
    },
  },
});

const DashboardPage = () => {
  return (
    <div className="h-fit bg-gray-50 shadow-md border-2 border-gray-200">
      <div className="py-4 sm:py-6 md:py-8">
        <QueryClientProvider client={queryClient}>
          <Dashboard />
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default DashboardPage;
