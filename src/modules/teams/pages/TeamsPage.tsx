import React, { useState } from 'react';
import { useTeams } from '../hooks/useTeams';
import { TeamCard } from '../components/TeamCard';
import { Team } from '../types/teams.types';
import { ErrorBoundary } from '@/modules/shared/components/error-boundary';
import { useInvitations } from '../hooks/useInvitations';
import { InvitationCard } from '../components/InvitationCard';
import { Invitation } from '../types/teams.types';
import { Inbox, Plus, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

const TeamsPage: React.FC = () => {
  const [showAllTeams, setShowAllTeams] = useState(false);
  const { teams, isLoading: isLoadingTeams, error: errorTeams } = useTeams();
  const { 
    invitations, 
    isLoading: isLoadingInvitations, 
    error: errorInvitations, 
    acceptInvitation,
    declineInvitation
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium text-[#92E3A9]">My Teams</h1>
          <Link 
            to="/teams/create"
            className="flex items-center gap-2 px-4 py-2 bg-[#92E3A9] text-white rounded-lg hover:bg-[#7dca8f] transition-colors"
          >
            <Plus size={20} />
            Create Team
          </Link>
        </div>

        <ErrorBoundary fallback={<p className="text-red-500 text-center"><br/>Something went wrong while loading teams.</p>}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams?.slice(0, showAllTeams ? teams.length : 6).map((team: Team) => (
              <TeamCard 
                key={team.id}
                id={team.id} 
                name={team.name}
                status={team.category.charAt(0).toUpperCase() + team.category.slice(1)} 
                icon={ 
                  <span className="text-lg font-medium text-[#92E3A9]">
                    {team.leader.name.charAt(0).toUpperCase()}
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
                className="text-[#92E3A9] hover:text-[#7dca8f] font-medium"
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
              <p className="text-[#92E3A9] text-center">
                Could not load team invitations. Please try again later.
              </p>
            </div>
          )}
          {!errorInvitations && invitations.length === 0 && !isLoadingInvitations && (
            <div className="text-center py-10 px-4 bg-gray-50 rounded-lg border border-gray-200">
              <Inbox className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-lg text-gray-600 font-medium">
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