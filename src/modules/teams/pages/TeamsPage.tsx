import React, { useState } from 'react';
import { useTeams } from '../hooks/useTeams';
import { TeamCard } from '../components/TeamCard';
import { Team } from '../types/teams.types';
import { ErrorBoundary } from '@/modules/shared/components/error-boundary';
import { useInvitations } from '../hooks/useInvitations';
import { InvitationCard } from '../components/InvitationCard';
import { Invitation } from '../types/teams.types';
import { Inbox, Plus, AlertCircle, UsersRound } from 'lucide-react';
import { Link } from 'react-router';

const TeamsPage: React.FC = () => {
  const [showAllTeams, setShowAllTeams] = useState(false);
  const { teams, isLoading: isLoadingTeams, error: errorTeams } = useTeams();
  const {
    invitations,
    isLoading: isLoadingInvitations,
    error: errorInvitations,
    acceptInvitation,
    declineInvitation,
  } = useInvitations();

  if (isLoadingTeams || isLoadingInvitations) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#92E3A9]"></div>
      </div>
    );
  }

  if (errorTeams) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error Loading Teams</h2>
          <p>{errorTeams.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-medium text-[#92E3A9]">My Teams</h1>
          <Link
            to="/teams/create"
            className="flex items-center gap-2 rounded-lg bg-[#92E3A9] px-4 py-2 text-white transition-colors hover:bg-[#7dca8f]"
          >
            <Plus size={20} />
            Create Team
          </Link>
        </div>

        <ErrorBoundary
          fallback={
            <p className="text-center text-red-500">
              <br />
              Something went wrong while loading teams.
            </p>
          }
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams
              ?.slice(0, showAllTeams ? teams.length : 6)
              .map((team: Team) => (
                <TeamCard
                  key={team.id}
                  id={team.id}
                  name={team.name}
                  status={
                    team.category.charAt(0).toUpperCase() +
                    team.category.slice(1)
                  }
                  icon={
                    <span className="text-lg font-medium text-[#92E3A9]">
                      <UsersRound size={20} />
                    </span>
                  }
                  memberCount={team.students.length}
                />
              ))}
          </div>
          {teams && teams.length > 6 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllTeams(!showAllTeams)}
                className="font-medium text-[#92E3A9] hover:text-[#7dca8f]"
              >
                {showAllTeams ? 'Show Less' : 'View All Teams'}
              </button>
            </div>
          )}
        </ErrorBoundary>

        <div className="mt-12">
          <h2 className="mb-6 text-lg font-medium text-gray-700">
            Team Invitations
          </h2>
          {errorInvitations && (
            <div className="flex flex-col items-center justify-center gap-2">
              <AlertCircle className="h-8 w-8 text-[#92E3A9]" />
              <p className="text-center text-[#92E3A9]">
                Could not load team invitations. Please try again later.
              </p>
            </div>
          )}
          {!errorInvitations &&
            invitations.length === 0 &&
            !isLoadingInvitations && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-10 text-center">
                <Inbox className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-lg font-medium text-gray-600">
                  No Pending Invitations
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  You currently don't have any pending team invitations.
                </p>
              </div>
            )}
          {!errorInvitations && invitations.length > 0 && (
            <div className="space-y-3">
              {invitations.map((invitation: Invitation) => (
                <InvitationCard
                  key={invitation.id}
                  invitation={invitation}
                  onAccept={acceptInvitation}
                  onDecline={declineInvitation}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
