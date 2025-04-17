import React from 'react';
import CreateTeamCard from '../components/CreateTeamCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialize QueryClient
const queryClient = new QueryClient();

const CreateTeamPage: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto">
          <CreateTeamCard />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default CreateTeamPage;
