// src/modules/Dashborad/page.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './components/dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: true,
    },
  },
});

const DashboardPage = () => {
  return (
    <div className="h-fit border-2 border-gray-200 bg-gray-50 shadow-md">
      <div className="py-4 sm:py-6 md:py-8">
        <QueryClientProvider client={queryClient}>
          <Dashboard />
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default DashboardPage;
