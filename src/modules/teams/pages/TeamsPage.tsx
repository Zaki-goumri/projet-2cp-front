import React from 'react';
import { useTeams } from '../hooks/useTeams';
import { ActiveTeams, SuggestedTeams } from '../components';
import CreateTeamCard from '../components/CreateTeamCard';

const TeamsPage: React.FC = () => {
  const { activeTeams, suggestedTeams, isLoading, error } = useTeams();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#92E3A9]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-2xl font-medium text-[#92E3A9]">Teams</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeTeams?.map((team) => (
            <ActiveTeams key={team.id} team={team} />
          ))}
          <CreateTeamCard />
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-lg font-medium text-gray-400">
            Teams you might like
          </h2>
          <div className="space-y-3">
            {suggestedTeams?.map((team) => (
              <SuggestedTeams key={team.id} team={team} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;