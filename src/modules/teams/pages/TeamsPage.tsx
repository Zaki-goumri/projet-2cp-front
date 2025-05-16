import React from 'react';
import { useTeams } from '../hooks/useTeams';
import { TeamCard } from '../components/TeamCard';
import { Team } from '../types/teams.types';
import { ErrorBoundary } from '@/modules/shared/components/error-boundary';
import { useInvitations } from '../hooks/useInvitations';
import { InvitationCard } from '../components/InvitationCard';
import { Invitation } from '../types/teams.types';
import { 
  InboxIcon, 
  PlusIcon, 
  AlertCircleIcon, 
  UsersRoundIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  SendIcon 
} from '@/modules/shared/icons';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { useSentInvitations } from '../hooks/useSentInvitations';
import { SentInvitationCard } from '../components/SentInvitationCard';
import { useUserStore } from '@/modules/shared/store/userStore';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
}) => {
  if (totalPages <= 1) return null; 

  return (
    <div className="mt-6 flex items-center justify-center space-x-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="flex items-center gap-1 disabled:opacity-50"
      >
        <ChevronLeftIcon width={16} height={16} />
        Previous
      </Button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={!hasNext}
        className="flex items-center gap-1 disabled:opacity-50"
      >
        Next
        <ChevronRightIcon width={16} height={16} />
      </Button>
    </div>
  );
};

const TeamsPage: React.FC = () => {
  const {
    teams,
    isLoading: isLoadingTeams,
    error: errorTeams,
    currentPage: teamsCurrentPage,
    totalPages: teamsTotalPages,
    hasNext: teamsHasNext,
    hasPrevious: teamsHasPrevious,
    goToNextPage: goToNextTeamPage,
    goToPreviousPage: goToPreviousTeamPage,
  } = useTeams();

  const {
    invitations,
    isLoading: isLoadingInvitations,
    error: errorInvitations,
    acceptInvitation,
    declineInvitation,
    currentPage: invCurrentPage,
    totalPages: invTotalPages,
    hasNext: invHasNext,
    hasPrevious: invHasPrevious,
    goToNextPage: goToNextInvPage,
    goToPreviousPage: goToPreviousInvPage,
  } = useInvitations();

  const {
    sentInvitations,
    isLoading: isLoadingSentInvitations,
    error: errorSentInvitations,
    cancelInvitation,
    isLoadingCancellation,
    currentPage: sentInvCurrentPage,
    totalPages: sentInvTotalPages,
    hasNext: sentInvHasNext,
    hasPrevious: sentInvHasPrevious,
    goToNextPage: goToNextSentInvPage,
    goToPreviousPage: goToPreviousSentInvPage,
  } = useSentInvitations();

  const { user } = useUserStore();

  
  const isLoading = isLoadingTeams || isLoadingInvitations || isLoadingSentInvitations;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#92E3A9]"></div>
      </div>
    );
  }

  if (errorTeams) {
    const isForbidden = errorTeams.message.includes('403');
    const errorMessage = isForbidden
      ? "You do not have permission to view teams. Please contact an administrator if you believe this is an error."
      : errorTeams.message;

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error Loading Teams</h2>
          <p>{errorMessage}</p>
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
            <PlusIcon />
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
            {teams?.map((team: Team) => (
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
                    <UsersRoundIcon />
                  </span>
                }
                memberCount={team.students.length}
              />
            ))}
          </div>
          {teams && teams.length > 0 && (
            <PaginationControls
              currentPage={teamsCurrentPage}
              totalPages={teamsTotalPages}
              hasNext={teamsHasNext}
              hasPrevious={teamsHasPrevious}
              onNext={goToNextTeamPage}
              onPrevious={goToPreviousTeamPage}
            />
          )}
          {teams?.length === 0 && !isLoadingTeams && (
            <p className="mt-6 text-center text-gray-500">You are not part of any teams yet.</p>
          )}
        </ErrorBoundary>

        <div className="mt-12">
          <h2 className="mb-6 text-lg font-medium text-gray-700 flex items-center gap-2">
            <InboxIcon size={20} /> Team Invitations Received
          </h2>
          {errorInvitations && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <AlertCircleIcon className="h-8 w-8 text-red-500" />
              <p className="font-medium text-red-700">
                Could not load received invitations.
              </p>
              <p className="text-sm text-red-600">Please try again later.</p>
            </div>
          )}
          {!errorInvitations &&
            invitations.length === 0 &&
            !isLoadingInvitations && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-10 text-center">
                <InboxIcon className="mx-auto h-12 w-12 text-gray-400" />
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
                  onAccept={() => acceptInvitation(Number(invitation.id))}
                  onDecline={() => declineInvitation(Number(invitation.id))}
                />
              ))}
            </div>
          )}
          {!errorInvitations && invitations.length > 0 && (
            <PaginationControls
              currentPage={invCurrentPage}
              totalPages={invTotalPages}
              hasNext={invHasNext}
              hasPrevious={invHasPrevious}
              onNext={goToNextInvPage}
              onPrevious={goToPreviousInvPage}
            />
          )}
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-lg font-medium text-gray-700 flex items-center gap-2">
            <SendIcon /> Sent Invitations
          </h2>
          {errorSentInvitations && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <AlertCircleIcon className="h-8 w-8 text-red-500" />
              <p className="font-medium text-red-700">
                Could not load sent invitations.
              </p>
              <p className="text-sm text-red-600">Please try again later.</p>
            </div>
          )}
          {!errorSentInvitations &&
            sentInvitations.length === 0 &&
            !isLoadingSentInvitations && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-10 text-center">
                <SendIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-lg font-medium text-gray-600">
                  No Sent Invitations
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't sent any team invitations yet.
                </p>
              </div>
            )}
          {!errorSentInvitations && sentInvitations.length > 0 && (
            <div className="space-y-3">
              {sentInvitations
                .filter((invitation: Invitation) => invitation.receiver?.id !== user?.id)
                .map((invitation: Invitation) => (
                  <SentInvitationCard
                    key={invitation.id}
                    invitation={invitation}
                    onCancel={cancelInvitation}
                    isCanceling={isLoadingCancellation}
                  />
                ))}
            </div>
          )}
          {!errorSentInvitations && sentInvitations.length > 0 &&  (
            <PaginationControls
              currentPage={sentInvCurrentPage}
              totalPages={sentInvTotalPages}
              hasNext={sentInvHasNext}
              hasPrevious={sentInvHasPrevious}
              onNext={goToNextSentInvPage}
              onPrevious={goToPreviousSentInvPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
